---
title: Leetcode 1249 移除无效的括号
description: Minimum Remove to Make Valid Parentheses
tag: Leetcode
---

#### 思路

遍历字符串，遇到左括号'('压入栈，遇到右括号')'看栈顶是否是左括号'('，是则出栈，否则右括号')'进栈。

最终留在栈里的即无效括号，每个无效括号进栈时记录其位置即可在输出时忽略。

#### 代码

实际代码里，由于括号的确定性，只将

cpp

```cpp
/*
 * @lc app=leetcode.cn id=1249 lang=cpp
 *
 * [1249] 移除无效的括号
 */

// @lc code=start
class Solution {
 public:
  string minRemoveToMakeValid(string s) {
    stack<int> stk;
    int len = s.size();
    for (size_t i = 0; i < len; i++) {
      if (s[i] == '(') {
        stk.push(i);
      } else {
        if (s[i] == ')') {
          if (stk.empty())
            s[i] = '&';
          else
            stk.pop();
        }
      }
    }
    while (!stk.empty()) {
      s[stk.top()] = '&';
      stk.pop();
    }

    s.erase(remove(s.begin(), s.end(), '&'), s.end());

    return s;
  }
};
// @lc code=end
```

C++中要从`string`中删除所有某个特定字符, 可用如下代码

```cpp
str.erase(std::remove(str.begin(), str.end(), 'a'), str.end());
```

> template <class ForwardIterator, class T>
>
>   ForwardIterator remove (ForwardIterator first, ForwardIterator last, const T& val);

作用: 在容器中, 删除`[first, last)`之间的所有值等于`val`的值.

删除方法: 将某个等于`val`的值用下一个不等于`val`的值覆盖.

返回值: 一个迭代器 (记作`newEnd`), 该迭代器指向最后一个未被删除元素的下一个元素, 即相当于容器新的`end`.

所以, 运行完`remove`后, 容器的`[first, newEnd)`内的元素即为所有未被删除的元素, `[newEnd, end)`之间的元素已经没用了.

这样, 再运行`str.erase(newEnd, str.end())`即可清空`[newEnd, end)`之间的元素.

参考来源：[C++ string删除字符串中所有的指定字符](https://blog.csdn.net/liangzhao_jay/article/details/81539865)