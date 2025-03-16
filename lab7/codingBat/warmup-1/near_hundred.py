def near_hundred(n):
    if (abs(100 - n) <= 10):
        return True
    return False

print(near_hundred(93))
print(near_hundred(90))
print(near_hundred(89))