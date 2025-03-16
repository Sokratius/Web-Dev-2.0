def reverse3(nums):
    nums2 = []
    for i in range(0, 3):
        nums2.append(nums[len(nums) - 1 - i])

    return nums2