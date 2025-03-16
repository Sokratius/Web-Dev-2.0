def double_char(str):
    str2 = ''
    for char in str:
        str2 += char
        str2 += char
    return str2

print(double_char("hello"))