def missing_char(str, n):
    str = str[:n] + str[n+1:]
    return str


print(missing_char('kitten', 1))