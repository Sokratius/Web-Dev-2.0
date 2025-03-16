def findMin(*args):
    args = list(args)
    min = args[0]
    for x in args:
        if x < min:
            min = x
    return min
    


a, b, c, d = map(int, input().split())
print(findMin(a, b, c, d))