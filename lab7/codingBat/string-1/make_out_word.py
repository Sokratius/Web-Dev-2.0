def make_out_word(symbols, str):
    return symbols[:2] + str + symbols[2:]


print(make_out_word('<<>>', 'Yay'))
print(make_out_word('<<>>', 'WooHoo'))
print(make_out_word('[[]]', 'word'))