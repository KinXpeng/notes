#### 两个数组的交集 II

```go
package main

import (
	"fmt"
	"sort"
) 

/*
  给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。

  输入：nums1 = [1,2,2,1], nums2 = [2,2]
  输出：[2,2]

  输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
  输出：[4,9]
*/

func main() {
	intersect([]int{4, 9, 5}, []int{9, 4, 9, 8, 4})
}

func intersect(m []int, n []int) []int {
	sort.Ints(m)
	sort.Ints(n)
	i, j := 0, 0
	result := []int{}
	for i < len(m) && j < len(n) {
		if m[i] == n[j] {
			result = append(result, m[i])
			i++
			j++
		} else if m[i] < n[j] {
			i++
		} else {
			j++
		}
	}
	fmt.Println(result)
	return result
}

```

#### 加一

```go
package main

import "fmt"

/*
  给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
  最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
  你可以假设除了整数 0 之外，这个整数不会以零开头。

  输入：digits = [1,2,3]
  输出：[1,2,4]

  输入：digits = [4,3,2,1]
  输出：[4,3,2,2]
*/

func main() {
	result := plusOne([]int{7, 2, 8, 5, 0, 9})
	fmt.Println(result)
}

func plusOne(nums []int) []int {
	length := len(nums)
	for i := length - 1; i >= 0; i-- {
		if nums[i] == 9 {
			nums[i] = 0
		} else {
			nums[i]++
			return nums
		}
	}
	nums = append(nums, 0)
	copy(nums[1:], nums)
	nums[0] = 1
	return nums
}
```

#### 移动0

```go
package main

import "fmt"

/*
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
请注意 ，必须在不复制数组的情况下原地对数组进行操作。

输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]

输入: nums = [0]
输出: [0]
*/

// 双指针法
func main() {
	result := moveZeroes([]int{7, 2, 0, 5, 0, 9})
	fmt.Println(result)
}

func moveZeroes(nums []int) []int {
	if len(nums) == 1 {
		return nums
	}
	k := 0
	for i := 0; i < len(nums); i++ {
		if nums[i] == 0 {
			k++
		} else if k != 0 {
			nums[i-k] = nums[i]
			nums[i] = 0
		}
	}
	return nums
}

// 另一种解法
// 从末位循环，遇到0则删除，再往末位补0
func moveZeroes(nums []int) []int {
	if len(nums) == 1 {
		return nums
	}
	for i := len(nums) - 1; i >= 0; i-- {
		if nums[i] == 0 {
			nums = append(nums[:i], nums[i+1:]...)
			nums = append(nums, 0)
		}
	}
	return nums
}
```

#### 两数之和

```go
package main

import (
	"fmt"
)

/*
	给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
	你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
	你可以按任意顺序返回答案。

	输入：nums = [2,7,11,15], target = 9
	输出：[0,1]

	输入：nums = [3,2,4], target = 6
	输出：[1,2]

	输入：nums = [3,3], target = 6
	输出：[0,1]
*/

func main() {
	result := twoSum([]int{1, 3, 4, 5, 1}, 9)
	fmt.Println(result)
}

func twoSum(nums []int, target int) []int {
	k := 0
label1:
	for i := 1; i < len(nums); i++ {
		if nums[k]+nums[i] == target {
			return []int{k, i}
		}
	}
	k++
	goto label1
}
```

