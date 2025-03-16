def string_splosion(str):
    str2 = ''
    for i in range(0, len(str)):
        str2 += str[:i+1]

    return str2