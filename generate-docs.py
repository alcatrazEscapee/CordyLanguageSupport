import re

def main():
    with open('../cordy/docs/stdlib.md', 'r', encoding='utf-8') as f:
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

if __name__ == '__main__':
    main()
