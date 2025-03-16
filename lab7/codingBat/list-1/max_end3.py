def max_end3(nums):
    max = nums[0]
    if max < nums[-1]:
        max = nums[-1]
    return [max, max, max]