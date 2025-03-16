def squirrel_play(temp, is_summer):
    upperBound = 90
    if is_summer:
        upperBound = 100

    if temp >= 60 and temp <= upperBound:
        return True
    else:
        return False