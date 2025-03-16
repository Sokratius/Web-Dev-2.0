def array_front9(nums):
    for i in range(0, min(len(nums), 4)):
        if nums[i] == 9:
            return True
    return False