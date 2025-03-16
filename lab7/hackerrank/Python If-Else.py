target = int(input())
if (target % 2 != 0):
    print("Weird")
else:
    if (target >= 2 and target <= 5 or target >= 20):
        print("Not Weird")
    else:
        print("Weird")