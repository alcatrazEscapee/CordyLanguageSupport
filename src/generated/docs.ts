
export function getHovers(): Map<string, string> {
    return new Map([
        ["print", "```\nprint(any, ...)\n```\n\nPrints each argument, space separated and with a single `\n` suffix, to standard output. Non-string types will have `str()` called on them before printing.\n\nWhen called with no arguments, prints a single `\n` character.\n\nReturns `nil`\n"],
        ["read", "```\nread() -> str\n```\n\nReads from `stdin` until end of file. Returns the result as a string.\n\nN.B. When reading from external sources, newline `\r\n` sequences will be replaced with a single `\n`.\n"],
        ["read_line", "```\nread_line() -> str\n```\n\nReads a single line from `stdin`. Returns the result as a string, with the newline suffix removed.\n"],
        ["read_text", "```\nread_text(path: str) -> str\n```\n\nReads from a text file, located at `path`. Any error reading the file will cause the program to exit. Returns the result as a string. \n\nN.B. When reading from external sources, newline `\r\n` sequences will be replaced with a single `\n`.\n"],
        ["write_text", "```\nwrite_text(path: str, content: str) -> str\n```\n\nWrites the string `content` to the file at `path`, in overwrite mode. A file will be created if it does not exist, and if it does it will be overwritten.\n"],
        ["env", "```\nenv(...) -> any\n```\n\nPossible signatures:\n\n- `env(): dict<str, str>`\n- `env(key: str) -> str | nil`\n\nWhen invoked with no arguments, will return a dictionary of all currently present environment variables. When invoked with one argument, will query that specific environment variable and return its value if defined, or `nil` if not.\n\nPrefer using `env(key)` over `env()[key]`.\n\n**Example**\n\n```bash\n$ cat example.cor\nenv('DUCKS') . repr . print\n\n$ cordy example.cor\nnil\n$ DUCKS=1337 cordy example.cor\n'1337'\n```\n"],
        ["argv", "```\nargv() -> list<str>\n```\n\nReturns the list of user defined program arguments when invoked. These are arguments appended to the cordy invocation after the file name.\n\n**Example**\n\n```bash\n$ cat example.cor\nargv() . repr . print\n\n$ cordy example.cor --number-of-ducks 2 -run\n['--number-of-ducks', '2', '-run']\n```\n"],
        ["bool", "```\nbool(x: any) -> bool\n```\n\nReturns the argument as a boolean. `nil`, `0`, `false`, `''`, and empty collections, will return `false`, everything else will return `true`.\n\nThe keyword `bool` can also be used in an `is` expression, to check if a value is of the type `bool`.\n"],
        ["int", "```\nint(...) -> int\n```\n\n**Possible Signatures**\n\n- `int(x: any) -> int`\n- `<T> int(x: any, def: T) -> int | T`\n\nReturns the argument as an integer. `nil` and `false` evaluate to `0`, where strings will be parsed as an integer or raise an error. If a second argument is provided, will instead return the `def` value instead of raising an error.\n\nThe keyword `int` can also be used in an `is` expression, to check if a value is of the type `int`.\n\n**Example**\n\n```\n>>> int('3')\n3\n>>> 3 is int\ntrue\n>>> '3' is int\nfalse\n```\n"],
        ["str", "```\nstr(x: any) -> str\n```\n\nReturns the argument as a string. See also `repr`.\n\nThe keyword `str` can also be used in an `is` expression, to check if a value is of the type `str`.\n\n"],
        ["list", "```\nlist(...) -> list\n```\n\nPossible signatures:\n\n- `list() -> list`\n- `<T> list(it: iterable<T>) -> list<T>`\n- `<T> list(T, ...) -> list<T>`\n\nWith no arguments, creates an empty list, the same as `[]`. With one argument, treats the argument as an iterable and copies each element into a new list. With more than one argument, collects each argument into a list.\n\nThe keyword `list` can also be used in an `is` expression, to check if a value is of the type `list`.\n\n**Example**\n\n```\n>>> list()\n[]\n>>> list('hello')\n['h', 'e', 'l', 'l', 'o']\n>>> list(1, 2, 3, 4)\n[1, 2, 3, 4]\n```\n"],
        ["set", "```\nset(...) -> set\n```\n\nPossible signatures:\n\n- `set() -> set`\n- `<T> set(it: iterable<T>) -> set<T>`\n- `<T> set(T, ...) -> set<T>`\n\nWith no arguments, creates an empty set. With one argument, treats the argument as an iterable and copies each element into a new set. With more than one argument, collects each argument into a set.\n\nThe keyword `set` can also be used in an `is` expression, to check if a value is of the type `set`.\n\n**Example**\n\n```\n>>> set()\n{}\n>>> set('blahaj')\n{'b', 'l', 'h', 'a', 'j'}\n>>> set(1, 2, 3, 4)\n{1, 2, 3, 4}\n```\n"],
        ["dict", "```\ndict(...) -> dict\n```\n\nPossible signatures:\n\n- `dict() -> dict`\n- `<K, V> dict(it: iterable<vector<K, V>>) -> dict<K, V>`\n- `<K, V> dict(vector<K, V>, ...) -> dict<K, V>`\n\nWith no arguments, creates an empty dictionary. With one argument, treats the argument as an iterable of key-value pairs and collects it into a new dictionary. With more than one argument, treats each argument as a key-value pair and collects each argument into a dictionary.\n\nThe keyword `dict` can also be used in an `is` expression, to check if a value is of the type `dict`.\n"],
        ["heap", "```\nheap(...) -> heap\n```\n\nPossible signatures:\n\n- `heap() -> heap`\n- `<T> heap(it: iterable<T>) -> heap<T>`\n- `<T> heap(T, ...) -> heap<T>`\n\nWith no arguments, creates an empty heap. With one argument, treats the argument as an iterable and copies each element into a new heap, maintaining the heap invariant. With more than one argument, collects each argument into a heap, maintaining the heap invariant.\n\n**Note:** Heaps of different types behavior is unspecified, as different types will compare equal and can have any internal ordering.\n\nThe keyword `heap` can also be used in an `is` expression, to check if a value is of the type `heap`.\n"],
        ["vector", "```\nvector(...) -> vector\n```\n\nPossible signatures:\n\n- `vector() -> vector`\n- `<T> vector(it: iterable<T>) -> vector<T>`\n- `<T> vector(T, ...) -> vector<T>`\n\nWith no arguments, creates an empty vector. With one argument, treats the argument as an iterable and copies each element into a new vector. With more than one argument, collects each argument into a vector.\n\nThe keyword `vector` can also be used in an `is` expression, to check if a value is of the type `vector`.\n"],
        ["function", "```\nfunction\n```\n\nThe keyword `function` can be used in an `is` expression, to check if a value is of the type `function`.\n\n**Example**\n\n```\n>>> fn() {} is function\ntrue\n>>> print is function\ntrue\n>>> 'hello' is function\nfalse\n```\n"],
        ["iterable", "```\niterable\n```\n\nThe keyword `iterable` can be used in an `is` expression, to check if a value is of any `iterable` type.\n\n**Example**\n\n```\n>>> '123' is iterable\ntrue\n>>> 123 is iterable\nfalse\n```\n"],
        ["repr", "```\nrepr(x: any) -> str\n```\n\nReturns the full representation of `x`, as a string. Strings are wrapped in single quotes, unlike `str`, although is functionally similar in other respects.\n\n**Example**\n\n```\n>>> repr('hello')\n'hello'\n```\n"],
        ["eval", "```\neval(x: str) -> any\n```\n\nCompiles and evaluates the Cordy expression represented by the string `x`. This is the inverse operation of `repr`. Note that `eval` cannot reference any variables and cannot define any (unless inside an anonymous function). Raises an error if the string `x` is not valid and evaluable Cordy code.\n\n**Example**\n\n```\n>>> '1 + 2' . eval\n3\n```\n"],
        ["typeof", "```\ntypeof(x: any) -> any\n```\n\nReturns the *type* of the argument. This returns either the value, or a function representing the type for each individual input. For example, `typeof(3)` will return the function `int`, `typeof([1, 2, 3])` will return the native function `list`. The `typeof` function has a few fundamental guarantees:\n\n1. The return value of this function will **always** be comparable using `==` to distinguish different types. That is, if `typeof(x) == typeof(y)`, these objects are of the exact same underlying type.\n2. The expression `x is typeof(x)` will **always** be `true`, for any value of `x`.\n3. Note that `x is y` **does not** imply that `typeof(x) == y`. This assumption is broken by some types which are considered subtypes of another:\n    - `bool` is a subtype of `int`, and `int` is a subtype of `complex`.\n    - Collection types, and `str` are subtypes of `iterable`\n    - All types are a subtype of `any`\n\n**Example**\n\n```\n>>> typeof(nil)\nnil\n>>> typeof('hello')\nstr\n>>> typeof([1, 2, 3])\nlist\n>>> typeof(fn() -> nil)\nfunction\n```\n"],
        ["monitor", "```\nmonitor(cmd: str) -> any\n```\n\nExecutes commands to monitor and inspect the state of the Cordy VM at runtime. `cmd` must be one of the following values:\n\n- `'stack'`: Returns a (copy of) the current program stack as a `list<any>`. The returned list will not mutate the original stack, although mutable types on the stack _can_ be modified and will reflect modifications done.\n- `'call-stack'`: Returns a view of the current program call stack as a `list<(int, int)>` Each entry consists of a pair of `frame_pointer` and `return_ip`.\n- `'code'`: Returns a disassembly view of the current executing code as a `list<str>`. This is not modifiable in any way.\n\nAny other value of `cmd` will cause a `MonitorError` to be raised.\n\n**Example**\n\n```\n>>> struct Box(value)\n>>> let box = Box('hello') // lvt offset = 1\n>>> box\nBox(value='hello')\n>>> let *_, (fp, _) = monitor 'call-stack' // access frame pointer of current call frame\n>>> let sp = monitor 'stack' [fp + 1] // access stack to get pointer to the original 'box'\n>>> sp->value = 'goodbye' // which we can mutate\ngoodbye\n>>> box // and will reflect changes\nBox(value='goodbye')\n```\n"],
        ["len", "```\nlen(x: iterable) -> int\n```\n\nReturns the length of `x`. For strings, this returns the number of Unicode Scalar Values. It is `O(1)` except for `str`, which is `O(n)`.\n"],
        ["range", "```\nrange(...) -> list<int>\n```\n\nPossible signatures:\n\n- `range(stop: int) -> list<int>`\n- `range(start: int, stop: int) -> list<int>`\n- `range(start: int, stop: int, step: int) -> list<int>`\n\nReturns a range of `int`, from `start` inclusive, to `stop` exclusive, counting by `step`. The default value of `start` is `0`, and `step` is 1 when not provided.\n\n**Note**: this function is lazy, and will produce elements when iterated through, i.e. by calling `list`.\n"],
        ["enumerate", "```\n<A> enumerate(x: iterable<A>) -> list<vector<int, A>>\n```\n\nReturns a `list` of pairs, of index and value of each element in the iterable `x`.\n\n**Note**: this function is lazy, and will produce elements when iterated through, i.e. by calling `list`.\n\n**Example**\n\n```\n>>> list(enumerate('hey'))\n[(0, 'h'), (1, 'e'), (2, 'y')]\n```\n"],
        ["sum", "```\nsum(...) -> int\n```\n\nPossible signatures:\n\n- `sum(it: iterable<int>) -> int`\n- `sum(int, ...) -> int`\n\nWith one argument, returns the sum of each value in the iterable. With more than one argument, returns the sum of all the arguments. Raises an error when invoked with no arguments.\n"],
        ["min", "```\nmin(...) -> int\n```\n\nPossible signatures:\n\n- `<T> min(it: iterable<T>) -> T`\n- `<T> min(T, ...) -> T`\n\nWith one argument, returns the minimum of each value in the iterable. With more than one argument, returns the minimum of all the arguments. Raises an error when invoked with no arguments.\n\nNote that the special case `min(int)` or `int.min` will return the lowest possible signed 63-bit integer representable.\n"],
        ["min_by", "```\nmin_by(...) -> int\n```\n\nPossible signatures:\n\n- `<A, B> min_by(key: fn(A) -> B, it: iterable<A>)`\n- `<A> min_by(cmp: fn(A, A) -> int, it: iterable<A>)`\n\nReturns either a minimum of `it` by the key `key`, or a minimum by the comparator function `cmp`, depending on the number of arguments required by `key` / `cmp`. Raises an error when `it` is an empty iterable.\n"],
        ["max", "```\nmax(...) -> int\n```\n\nPossible signatures:\n\n- `<T> max(it: iterable<T>) -> T`\n- `<T> max(T, ...) -> T`\n\nWith one argument, returns the maximum of each value in the iterable. With more than one argument, returns the maximum of all the arguments. Raises an error when invoked with no arguments.\n\nNote that the special case `max(int)` or `int.max` will return the highest possible signed 63-bit integer representable.\n"],
        ["max_by", "```\nmax_by(...) -> int\n```\n\nPossible signatures:\n\n- `<A, B> max_by(key: fn(A) -> B, it: iterable<A>)`\n- `<A> max_by(cmp: fn(A, A) -> int, it: iterable<A>)`\n\nReturns either a maximum of `it` by the key function `key`, or a minimum by the comparator function `cmp`, depending on the number of arguments required by `key` / `cmp`. Raises an error when `it` is an empty iterable.\n"],
        ["map", "```\n<A, B> map(f: fn(A) -> B, it: iterable<A>) -> list<B>\n```\n\nApplies the function `f` to each value in the iterable `it`, and returns the list of each result.\n\n**Example**\n\n```\n>>> [1, 3, 5] . map(+1)\n[2, 4, 6]\n```\n"],
        ["filter", "```\n<A> filter(f: fn(A) -> any, it: iterable<A>) -> list<A>\n```\n\nApplies the function `f` to each value in the iterable `it`, and retains that value if it returns a truthy value. Returns a list of all elements which returned a truthy value.\n\n**Example**\n\n```\n>>> [-2, 4, -4, 2] . filter(>0)\n[4, 2]\n```\n"],
        ["flat_map", "```\n<A, B> flat_map(f: fn(A) -> iterable<B>, it: iterable<A>) -> list<B>\n```\n\nApplies the function `f` to each element in `it`, and then concatenates the results. This is equivalent to `. map(f) . concat`.\n\n**Example**\n\n```\n>>> [1, 2, 3, 4] . flat_map(fn(i) -> range(i))\n[0, 0, 1, 0, 1, 2, 0, 1, 2, 3]\n```\n"],
        ["concat", "```\n<A> concat(it: iterable<iterable<A>>) -> list<A>\n```\n\nConcatenates the iterables in the input into one list. This is equivalent to `flat_map(fn(x) -> x)`, but should be preferred over that due to performance.\n\n**Example**\n\n```\n>>> [[1, 2, 3], [4, 5, 6], [7, 8, 9]] . concat\n[1, 2, 3, 4, 5, 6, 7, 8, 9]\n```\n"],
        ["zip", "```\n<A> zip(...) -> list<A>\n```\n\nPossible signatures:\n\n- `<A> zip(it: iterable<iterable<A>>) -> list<A>`\n- `<A> zip(iterable<A>, ...) -> list<A>`\n\nWhen invoked with a single argument, treats the argument as an iterable and each element as an individual argument. Then, iterates each iterable in parallel, returning a list of vectors until the shortest iterable is exhausted.\n\n**Example**\n\n```\n>>> zip([1, 2, 3], [10, 20, 30])\n[(1, 10), (2, 20), (3, 30)]\n>>> zip(['hello', 'the', 'world'])\n[('h', 't', 'w'), ('e', 'h', 'o'), ('e', 'e', 'r')]\n```\n"],
        ["reduce", "```\n<A> reduce(f: fn(A, A) -> A, it: iterable<A>) -> A\n```\n\nReduces an iterable to a single value by successively applying `f` on the first two elements in the iterable, until only one remains. Raises an error if the argument was an empty iterable\n\n**Example**\n\n```\n>>> [1, 3, 5, 7] . reduce(+)\n16\n>>> ['hello', 'the', 'world'] . reduce(fn(a, b) -> a + ' ' + b)\n'hello the world'\n```\n"],
        ["sort", "```\n<A> sort(it: iterable<A>) -> list<A>\n```\n\nReturns a list of the elements in `it`, sorted in ascending order. Note that if `it` contains multiple different types the returned order is unspecified as different types will compare as equal.\n\n**Example**\n\n```\n>>> [1, 5, 3, 2, 4] . sort\n[1, 2, 3, 4, 5]\n```\n"],
        ["sort_by", "```\n<A> sort_by(...) -> list<A>\n```\n\nPossible signatures:\n\n- `<A, B> sort_by(key: fn(A) -> B, it: iterable<A>) -> list<A>`\n- `<A> sort_by(cmp: fn(A, A) -> int, it: iterable<A>) -> list<A>`\n\nReturns the elements from `it` in a sorted ascending order, either by the key function `key`, or by the comparator function `cmp`, depending on the number of arguments required by `key` / `cmp`.\n"],
        ["group_by", "```\n<T, K> group_by(by: int | fn(T) -> K, it: iterable<T>) -> list<vector<T>> | dict<K, vector<T>>\n```\n\nPossible signatures:\n\n- `<T> group_by(by: int, it: iterable<T>) -> list<vector<T>>`\n- `<T, K> group_by(by: fn(T) -> K, it: iterable<T>) -> dict<K, vector<T>>`\n\nWhen invoked with an int as the argument to `by`, this will return a list of groups (vectors) of length `by` from `it`, until it is exhausted. If the length of `it` does not perfectly divide `by`, the last group will contain the remainder.\n\n**Example**\n\n```\n>>> [1, 2, 3, 4, 5, 6] . group_by(2)\n[(1, 2), (3, 4), (5, 6)]\n>>> [1, 2, 3, 4, 5] . group_by(3)\n[(1, 2, 3), (4, 5)]\n```\n\nWhen invoked with a function as the argument to `by`, this will instead use the function on each element of the iterable as a key extractor. It will then create a dictionary mapping each key to its value.\n\n**Example**\n\n```\n>>> [1, 2, 3, 4, 5] . group_by(%3)\n{1: (1, 4), 2: (2, 5), 0: (3)}\n>> [1, 2, 3, 4, 5] . group_by(fn(x) -> if x % 2 == 0 then 'even' else 'odd')\n{'odd': (1, 3, 5), 'even': (2, 4)}\n```\n"],
        ["reverse", "```\n<A> reverse(it: iterable<A>) -> list<A>\n```\n\nReturns a list of the elements in `it`, in reverse order.\n\n**Example**\n\n```\n>>> [1, 3, 5, 7] . reverse\n[7, 5, 3, 1]\n```\n"],
        ["permutations", "```\n<A> permutations(n: int, it: iterable<A>) -> list<vector<A>>\n```\n\nReturns a list of all permutations of `n` elements from `it`. If `n` is larger than the length of `it`, nothing will be returned. Raises an error if `n` is negative.\n\n**Example**\n\n```\n>>> [1, 2, 3] . permutations(2)\n[(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]\n```\n"],
        ["combinations", "```\n<A> combinations(n: int, it: iterable<A>) -> list<vector<A>>\n```\n\nReturns a list of all combinations of `n` elements from `it`. If `n` is larger than the length of `it`, nothing will be returned. Raises an error if `n` is negative.\n\n**Example**\n\n```\n>>> [1, 2, 3] . combinations(2)\n[(1, 2), (1, 3), (2, 3)]\n```\n"],
        ["any", "```\n<A> any(f: fn(A) -> bool, it: iterable<A>) -> bool\n```\n\nReturns `true` if any of the values in `it` return `true` to the function `f`. This is lazy and only evaluates as many elements in `it` as needed.\n\n```\n>>> [-1, -6, 3, -2] . any(>0)\ntrue\n```\n"],
        ["all", "```\n<A> all(f: fn(A) -> bool, it: iterable<A>) -> bool\n```\n\nReturns `true` if all the values in `it` return `true` to the function `f`. This is lazy and only evaluates as many elements in `it` as needed.\n\n**Example**\n\n```\n>>> [1, 6, 3, 2] . all(>0)\ntrue\n```\n"],
        ["memoize", "```\n<A> memoize(f: fn(...) -> A) -> fn(...) -> A\n```\n\nThis creates a memorizing wrapper around a function. The returned function will cache all values based on the input parameters. The return value is invoked identically to the provided function.\n\n**Example**\n\n```\n>>> fn add(x, y) {\n...     print('add was called')\n...     x + y\n... }\n>>> let cached_add = memoize(add)\n>>> add(1, 2)\nadd was called\n3\n>>> add(1, 2)\n3\n```\n"],
        ["pop", "```\n<A> pop(it: iterable<A>) -> A\n```\n\nPops a value from a collection. For `list`, this will be a value at the back of the collection. For a `heap`, this is the top of the heap, i.e. the minimum value. For a `dict`, this will return a key-value pair.\n"],
        ["pop_front", "```\n<A> pop_front(it: list<A>) -> A\n```\n\nPops a value from the front of a list.\n"],
        ["push", "```\n<A> push(x: A, it: list<A> | set<A> | heap<A>) -> iterable<A>\n```\n\nPushes a value `x` into a collection `it`. For `list`, this will be a value at the back of the collection. Returns the collection.\n"],
        ["push_front", "```\n<A> push_front(x: A, it: list<A>) -> list<A>\n```\n\nPushes a value `x` into the front of a list. Returns the list.\n"],
        ["insert", "```\ninsert(...)\n```\n\nPossible signatures:\n\n- `<A> insert(index: int, x: A, it: list<A>) -> list<A>`\n- `<K, V> insert(key: K, value: V, it: dict<K, V>) -> dict<K, V>`\n\nInserts a value `x` into a collection `it`, either by key, or by value. For `list`, will return an error if the index is out of bounds of the list. Returns the collection.\n"],
        ["remove", "```\nremove(...)\n```\n\nPossible signatures:\n\n- `<A> remove(index: int, it: list<A>) -> A`\n- `<A> remove(value: A, it: set<A>) -> bool`\n- `<K, V> remove(key: K, it: dict<K, V>) -> bool`\n\nRemoves a value from a collection `it`, with the behavior differing by collection. For `list`, this removes a value by index. For `set`, this will remove by value, and return `true` if the value was present. For `dict`, this will remove an entry by key, and return `true` if the key was removed.\n"],
        ["clear", "```\nclear(it: iterable) -> iterable\n```\n\nClears the contents of a collection. Returns the collection.\n"],
        ["find", "```\n<A> find(x: A | fn(A) -> bool, it: iterable<A>) -> A\n```\n\nIf `x` is a function, this will find the first value from the left in `it` where a value returns `true` to the function. If `x` is a value, it will return the first value from the left in `it` where a value is equal to `x`.\n\n`find(x)` is equivalent to `find(==x)` if `x` is not a function.\n\nReturns `nil` if the value was not found.\n\n**Example**\n\n```\n>>> [1, 2, 3, 4, 5] . find(4)\n4\n>>> [1, 2, 3, 4, 5] . find(fn(i) -> i % 3 == 0)\n3\n```\n"],
        ["rfind", "```\n<A> rfind(x: A | fn(A) -> bool, it: iterable<A>) -> A\n```\n\nIf `x` is a function, this will find the first value from the right in `it` where a value returns `true` to the function. If `x` is a value, it will return the first value from the right in `it` where a value is equal to `x`.\n\n`rfind(x)` is equivalent to `rfind(==x)` if `x` is not a function.\n\nReturns `nil` if the value was not found.\n\n**Example**\n\n```\n>>> [1, 2, 3, 4, 5] . rfind(4)\n4\n>>> [1, 2, 3, 4, 5] . rfind(fn(i) -> i % 3 == 0)\n3\n```\n"],
        ["index_of", "```\n<A> index_of(x: A | fn(A) -> bool, it: iterable<A>) -> int\n```\n\nLike `find`, but for an indexable collection, returns the index where the value was found, not the value itself.\n"],
        ["rindex_of", "```\n<A> rindex_of(x: A | fn(A) -> bool, it: iterable<A>) -> int\n```\n\nLike `rfind`, but for an indexable collection, returns the index where the value was found, not the value itself.\n"],
        ["abs", "```\nabs(x: int) -> int\n```\n\nReturns the absolute value of `x`.\n"],
        ["sqrt", "```\nsqrt(x: int) -> int\n```\n\nReturns the positive integer square root of `x`, or the largest `y` such that `y*y <= x`.\n"],
        ["count_ones", "```\ncount_ones(x: int) -> int\n```\n\nReturns the number of ones in the 63-bit, signed, binary representation of `x`\n"],
        ["count_zeros", "```\ncount_zeros(x: int) -> int\n```\n\nReturns the number of zeros in the 63-bit, signed, binary representation of `x`\n"],
        ["real", "```\nreal(x: bool | int | complex) -> int\n```\n\nWith an int-like argument, returns the real part. For `bool` and `int`, this is the same as invoking `int`. For `complex`, this will return the real component as an integer.\n\n**Example**\n\n```\n>>> true . real\n1\n>>> 5 . real\n5\n>>> 7 + 13i . real\n7\n```\n"],
        ["imag", "```\nimag(x: bool | int | complex) -> int\n```\n\nWith an int-like argument, returns the imaginary part. For `bool` and `int`, this will always return `0`. For `complex`, this will return the imaginary component as an integer.\n\n**Example**\n\n```\n>>> true . imag\n0\n>>> 5 . imag\n0\n>>> 7 + 13i . imag\n13\n```\n"],
        ["lcm", "```\nlcm(...) -> int\n```\n\nPossible signatures:\n\n- `lcm(it: iterable<int>) -> int`\n- `lcm(int, ...) -> int`\n\nWith one argument, returns the least common multiple of each value in the iterable. With more than one argument, returns the least common multiple of all the arguments. Raises an error when invoked with no arguments.\n"],
        ["gcd", "```\ngcd(...) -> int\n```\n\nPossible signatures:\n\n- `gcd(it: iterable<int>) -> int`\n- `gcd(int, ...) -> int`\n\nWith one argument, returns the greatest common divisor of each value in the iterable. With more than one argument, returns the greatest common divisor of all the arguments. Raises an error when invoked with no arguments.\n"],
        ["split", "```\nsplit(pattern: str, x: str) -> list<str>\n```\n\nSplits a string `x` based on `pattern`, with regular expression (regex) support. If `pattern` is an empty string, this functions identical to `list` applied to a string, and returns a list of all characters in the string. Otherwise, it will treat `pattern` like a regex, and split the string on sequences matching the regex.\n\nRegex syntax is the same as used by the `replace`, and `search` functions.\n\n**Example**\n\n```\n>>> 'abc' . split('')\n['a', 'b', 'c']\n>>> 'hello the world' . split(' ')\n['hello', 'the', 'world']\n>>> '   hello  \t the \n\n   world  !' . trim . split('\s+')\n['hello', 'the', 'world', '!']\n```\n"],
        ["join", "```\njoin(joiner: str, iter: iterable<any>) -> str\n```\n\nJoins an iterable into a single string. First calls `str()` on any arguments, and joins them separated by `joiner`.\n\n**Example**\n\n```\n>>> [1, 2, 3, 4, 5] . join(' + ')\n'1 + 2 + 3 + 4 + 5'\n>>> 'hello' . join(' ')\n'h e l l o'\n```\n\nThis is a native optimized form of the below usage of `reduce`:\n\n```\n>>> reduce(fn(x, y) -> str(x) + joiner + str(y), iter)\n```\n"],
        ["replace", "```\nreplace(...) -> str\n```\n\n**Possible Signatures**\n\n- `replace(pattern: str, replacer: str, x: str)`\n- `replace(pattern: str, replacer: fn(vector<str>) -> str, x: str)`\n\nPerforms string replacement, with regular expression (regex) support. Regex syntax is the same as used by the [Fancy Regex](https://docs.rs/fancy-regex/0.11.0/fancy_regex/) crate. Additionally, `\r`, `\n`, and `\t` sequences are supported as part of a regex, and they will be replaced in the pattern with `\\r`, `\\n`, and `\\t` respectively.\n\nWhen `replacer` is a string, this will replace all instances of `pattern` in the string `x` with `replacer`. When `replacer` is a function with one defined argument, this will invoke that function for each replacement to be made, to provide the result. This takes an argument of the match, which is a vector consisting of the full text, followed by any capture groups found.\n\nNote that capture groups can also be referenced in a string via `$<number>` syntax, where `$0` represents the entire match.\n\n**Examples**\n\n```\n>>> 'bob and alice' . replace('and', 'or')\n'bob or alice'\n>>> 'bob and alice' . replace('\sa', ' Ba')\n'bob Band Balice'\n>>> 'bob and alice' . replace('[a-z]+', '$0!')\n'bob! and! alice!'\n>>> 'bob and alice' . replace('[a-z]+', fn((g, *_)) -> g . reverse . reduce(+))\n'bob dna ecila'\n>>> 'bob and alice' . replace('([a-z])([a-z]+)', fn((_, g1, g2)) -> to_upper(g1) + g2)\n'Bob And Alice'\n```\n"],
        ["search", "```\nsearch(pattern: str, x: str) -> list<vector<str>>\n```\n\nMatches a string `x` against a given `pattern`, and returns a list of all results. The pattern is a regular expression (regex), with syntax identical to using `replace`. When invoked, this returns a list of all matches in the string, or an empty list if no matches are found. A match consists of a vector of all capture groups, with the first group containing the entire match.\n\nNote, for simple substring searching, it is sufficient to test for truthiness, as no match will return an empty list. Using characters such as `^` and `$` in the regex will also ensure that only one match is possible, and so can only return a list with at most one element.\n\n**Examples**\n\n```\n>>> 'bob and alice' . search('bob')\n[('bob')]\n>>> 'bob and alice' . search('a[a-z]+')\n[('and'), ('alice')]\n>>> 'bob and alice' . search('([a-z])[^ ]+([a-z])')\n[('bob', 'b', 'b'), ('and', 'a', 'd'), ('alice', 'a', 'e')]\n```\n"],
        ["ord", "```\nord(x: str) -> int\n```\n\nWhen called with a string containing exactly one character (unicode scalar value), returns the integer representing the unicode character.\n\n**Examples**\n\n```\n>>> ord('a')\n97\n>>> ord('A')\n65\n```\n"],
        ["char", "```\nchar(x: int) -> str\n```\n\nConverts an integer to its unicode character representation, as a single-character string. If the integer represents an invalid character, an error will be raised instead.\n\n**Examples**\n\n```\n>>> char(97)\n'a'\n>>> char(65)\n'A'\n```\n"],
        ["union", "```\n<T> union(other: iterable<T>, self: set<T>) -> set<T>\n```\n\nComputes a union of `self` and `other`, mutating `self`. This is functionally similar to `self |= set(other)`, _except_ this will directly mutate `self`, which can be desirable for performance reasons with large sets. This will return `self`.\n\n**Example**\n\n```\n>>> let x = {1, 2, 3}\n>>> x . union({3, 4})\n{1, 2, 3, 4}\n>>> x\n{1, 2, 3, 4}\n```\n"],
        ["intersect", "```\n<T> intersect(other: iterable<T>, self: set<T>) -> set<T>\n```\n\nComputes an intersection of `self` and `other`, mutating `self`. This is functionally similar to `self &= set(other)`, _except_ this will directly mutate `self`, which can be desirable for performance reasons with large sets. This will return `self`.\n\n**Example**\n\n```\n>>> let x = {1, 2, 3}\n>>> x . intersect({2, 3, 4})\n{2, 3}\n>>> x\n{2, 3}\n```\n"],
        ["difference", "```\n<T> difference(other: iterable<T>, self: set<T>) -> set<T>\n```\n\nComputes a (non-symmetric) difference of `self` and `other`, mutating `self`. This is functionally similar to `self -= set(other)`, _except_ this will directly mutate `self`, which can be desirable for performance reasons with large sets. This will return `self`.\n\n**Example**\n\n```\n>>> let x = {1, 2, 3}\n>>> x . difference({3, 4})\n{1, 2}\n>>> x\n{1, 2}\n```\n"],
        ["default", "```\n<K, V> default(x: V, it: dict<K, V>) -> dict<K, V>\n```\n\nSets the default value of `it` to `x`, and then returns `it`. This means that any future queries into `it` via the index syntax, if the key is not in the dictionary, will return `x`.\n\n**Note:** If `x` is a mutable value, such as a list, the same instance will be returned from each access to the default value.\n\n**Example**\n\n```\nlet d = dict()\nd['hello'] // will raise an error\nd . default('nope')\nd['hello'] // returns 'nope'\n```\n"],
        ["keys", "```\n<K, V> keys(it: dict<K, V>) -> set<K>\n```\n\nReturns a set of all keys in `it`, maintaining insertion order.\n"],
        ["values", "```\n<K, V> values(it: dict<K, V>) -> list<V>\n```\n\nReturns a list of all values in `it`, maintaining insertion order.\n"],
    ]);
}
