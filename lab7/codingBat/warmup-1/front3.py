def front3(str):
    front = 3
    if len(str) <  front:
        return str*3
    else:
        return str[:3]*3


print(front3('Java'))
print(front3('Chocolate'))
print(front3('abc'))