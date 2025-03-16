def monkey_trouble(a_smile, b_smile):
    if a_smile == b_smile:
        return True
    return False

print(monkey_trouble(True, True))
print(monkey_trouble(False, False))
print(monkey_trouble(True, False))