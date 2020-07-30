---
title: C# Attribute研究
description: C# Attribute研究
img: default-cover.jpg
alt: C# Attribute
---

# C# 特性(Attribute)

学到System.IO还好，挺简单，到这突然给我来了一巴掌似的。

还是得好好研究下。

<!--more-->

在unity当中有[range(0,1)]这样的方法来限制变量范围

1. ### Conditional

   这个预定义特性标记了一个条件方法，其执行依赖于指定的预处理标识符。

   ```csharp

   [Conditional(
      conditionalSymbol
   )]
   ```
   
   需要注意的是此特性需要System.Diagnostics命名空间

   ```csharp
   #define DEBUG
   using System;
   using System.Diagnostics;
   public class Myclass
   {
       [Conditional("DEBUG")]
       public static void Message(string msg)
       {
           Console.WriteLine(msg);
       }
   }
   class Test
   {    public static void Main()
       {
           Myclass.Message("In Main function.");
       }
   }
   ```
   
   若在上述代码将#define DEBUG去掉，Message就不会编译和执行，可以用来调试时打印过程等
   
2. ### Obsolete

   这个预定义特性标记了不应被使用的程序实体。它可以让您通知编译器丢弃某个特定的目标元素。例如，当一个新方法被用在一个类中，但是您仍然想要保持类中的旧方法，您可以通过显示一个应该使用新方法，而不是旧方法的消息，来把它标记为 obsolete（过时的）。

   ```csharp
   [Obsolete(
      message,
      iserror
   )]
   ```

   ```
   [Obsolete("Don't use OldMethod, use NewMethod instead", true)]
      static void OldMethod()
      {
         Console.WriteLine("It is the old method");
      }
   ```

   然后在Main函数里调用OldMethod便会编译器报错：Don't use .... ，总之，我目前觉得没啥用，可能重构/项目重写的时候会用到。

3. ### 构建自定义特性

   预定义特性 **AttributeUsage** 描述了如何使用一个自定义特性类。它规定了特性可应用到的项目的类型。

   ```csharp
   [AttributeUsage(
      validon,
      AllowMultiple=allowmultiple,
      Inherited=inherited
   )]
   //用法如下
   [AttributeUsage(AttributeTargets.All)]
   public class TestAttribute : Attribute
   {
   }
   [TestAttribute]//结构
   public struct TestStruct { }
   
   [TestAttribute]//枚举
   public enum TestEnum { }
   
   
   [TestAttribute]//类上
   public class TestClass
   {
       [TestAttribute]
       public TestClass() { }
   
       [TestAttribute]//字段
       private string _testField;
   
       [TestAttribute]//属性
       public string TestProperty { get; set; }
   
       [TestAttribute]//方法上
       [return: TestAttribute]//定义返回值的写法
       public string TestMethod([TestAttribute] string testParam)//参数上
       {
           throw new NotImplementedException();
       }
   }
   ```

   1. validon 枚举AttributeTargets的值 default 为 AttributeTargets.all

   2. AllowMultipie 布尔值：特性是否多用

   3. inherited 布尔值：是否可继承

      ```csharp
       [AttributeUsage(AttributeTargets.Property)]
          class ValidAttribute : Attribute
          {
              public ValidAttribute(int maxLength)
              {
                  _maxLength = maxLength;
              }
              private int _maxLength;
              protected int MaxLength   //这里的get和set和vue里getter setter很像
              {
                  get
                  {
                      return _maxLength;
                  }
                  set
                  {
                      _maxLength = value;
                  }
              }
          }
      ```

      自定义一个Attribute类检查字符串长度

      写一个实体类使用自定义特性

      ```csharp
      class BaseClass
          {
              [Valid(10)]
              public String Name { get; set; }
          }
      ```

      写一个验证类

      ```csharp
      
          class Valid
          {
              public void Validate(object obj)
              {
                  var t = obj.GetType();
                  var properties = t.GetProperties();
                  foreach (var property in properties)
                  {
                      if (!property.IsDefined(typeof(ValidAttribute), false)) continue;
                      var attributes = property.GetCustomAttributes(false);
                      foreach (var attribute in attributes)
                      {
                          var maxLength = (int)attribute.GetType().GetProperty("MaxLength").GetValue(attribute);
      
                          var propertyValue = property.GetValue(obj) as string;
                          if (propertyValue == null)
                              throw new Exception("value is null.");
                          if (propertyValue.Length > maxLength)
                              throw new Exception(string.Format("属性{0}的值{1}超过了限制长度{2}", property.Name, propertyValue, maxLength));
                      }
                  }
              }
          }
      ```

      最后主函数运行

      ```csharp
      static void Main(string[] args)
              {
            var Account = new Account() { Name = "Parz1", Pwd = "123" };
                  try
                  {
                      ValidFunc vf = new ValidFunc();
                      vf.Validate(Account);
                      Console.WriteLine(vf);
                  }
                  catch (Exception ex)
                  {
                      Console.WriteLine(ex.Message);
                  }
                  Console.ReadLine();
              }
      ```
      
      测试结果
      
      ```
      属性Name的值Parz112超过了限制长度5
      ```
      
      ## 总结
      
      学着别人写下来感觉特性配合反射可以做很多事，现在只了解了这么一种写法，其它的以后有时间再跟进。