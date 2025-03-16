size = int(input())
arr = [int(x) for x in input().split(' ')]
for i in range (0, size):
    if (i % 2 == 0):
        print(arr[i], end=' ')