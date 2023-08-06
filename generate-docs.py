import re
import json

CORDY = '../cordy'
TYPES = ('int', 'str', 'function', 'list', 'heap', 'dict', 'set', 'vector', 'any', 'iterable')

def main():
    with open('%s/docs/stdlib.md' % CORDY, 'r', encoding='utf-8') as f:
        text = f.read()
    
    prefix = False
    docs = {}
    buffer = []
    current = None
    for line in text.split('\n'):
        if prefix:
            if line.startswith('###'):
                if current is not None:
                    docs[current] = buffer
                match = re.match(r'###[^`]+`[<>A-Z, ]*([A-Za-z_]+)[`\(]', line)
                assert match, 'No match: %s' % repr(line)
                current = match.group(1)
                line = line[line.index('`'):]  # Skip the leading header
                assert line.startswith('`') and line.endswith('`')
                line = line.replace('`', '\\n```\\n')[2:-2]  # Make the top code block a full one, and trim excess newlines
                buffer = [line]
            else:
                buffer.append(line)
        else:
            if line == '---':
                prefix = True
    if current is not None:
        docs[current] = buffer

    with open('./src/generated/docs.ts', 'w', encoding='utf-8') as f:

        f.write("""
export function getHovers(): Map<string, string> {
    return new Map([
""")

        for k, v in docs.items():
            f.write('        ["%s", "%s"],\n' % (k, '\\n'.join(i.replace('"', '\\"') for i in v)))

        f.write("""    ]);
}
""")
        
    with open('%s/src/compiler/scanner.rs' % CORDY, 'r', encoding='utf-8') as f:
        text = f.read()
    
    keywords = []
    for line in text.split('\n'):
        match = re.match(r'    Keyword([A-Z][a-z]+),', line)
        if match:
            key = match.group(1).lower()
            if key != 'true' and key != 'false' and key != 'nil':
                keywords.append(key)

    with open('./syntaxes/cordy.tmLanguage.json', 'r', encoding='utf-8') as f:
        syntax = json.load(f)

    syntax['repository']['keywords']['patterns'][0]['match'] = '\\b(' + '|'.join(keywords) + ')\\b'
    syntax['repository']['builtins']['patterns'][0]['match'] = '\\b(' + '|'.join(k for k in docs.keys() if k not in TYPES) + ')\\b'
    
    with open('./syntaxes/cordy.tmLanguage.json', 'w', encoding='utf-8') as f:
        json.dump(syntax, f, indent=4)
    



if __name__ == '__main__':
    main()
