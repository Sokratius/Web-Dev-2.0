def not_string(str):
    if str.startswith('not'):
        return str
    return 'not '+ str

print(not_string('candy'))
print(not_string('x'))
print(not_string('not bad'))