

#region 函數裝飾器
# def deprecated(fn):
#     return fn 

# def deprecated(fn):
#     def wrapper():
#         print(f"Warning: {fn.__name__} function is deprecatrd.") 
#         return fn()
#     return wrapper

# def hi():
#     print("Hello Kitty") 


# hi=deprecated(hi)
# hi()  

#endregion 函數裝飾器

#region @語法糖
# def deprecated(fn):
#     def wrapper():
#         print(f"Warning: {fn.__name__} function is deprecatrd.") 
#         return fn()
#     return wrapper


# @deprecated
# def hi():
#     print("Hello Kitty")
# hi()    


# 原本的參數？
# def deprecated(fn):
#     def wrapper(*args,**kwargs):
#         print(f"Warning: {fn.__name__} function is deprecatrd.") 
#         return fn(*args,**kwargs)
#     return wrapper

# @deprecated
# def hi(someone):
#     print(f"Hello {someone}")

# hi("Kitty")    


# 帶參數的裝飾器
# def deprecated(reason=None):
#     def decorate(fn):
#         message=f"Warning: {fn.__name__} function is deprecated."
#         if reason:
#             message=f"{message}, reason:{reason}"
#         def wrapper(*args,**kwargs):
#             print(message)
#             return fn(*args,**kwargs)    
#         return wrapper
#     return decorate


# @deprecated(reason="我就是不想用了")
# def hi(someone):
#     print(f"Hello {someone}")

# hi("Kitty")

# 最後寫法

# def deprecated(reason=None):
#     def decorator(fn):
#         message=f"Warning: {fn.__name__} function is deprecated."
#         if reason:
#             message=f"{message}, reason:{reason}"
#         def wrapper(*args,**kwargs):
#             print(message)
#             return fn(*args,**kwargs)
#         return wrapper
#     if callable(reason):
#         decorator=deprecated()
#         return decorator(reason)
#     return decorator

# @deprecated(reason="我就是不想用了")
# def hi(someone):
#     print(f"Hello {someone}")

# hi("Kitty")

# @deprecated()
# def hy(someone):
#     print(f"hy Hello {someone}")

# hy("terry")

#endregion @語法糖


#region 遞迴
# def fibonacci(n):
#     a, b = 0, 1
#     for _ in range(n):
#         a, b = b, a + b

#     return a
# def R_fibonacci(n):
#     if n == 0:
#         return 0

#     if n == 1:
#         return 1

#     return fibonacci(n - 1) + fibonacci(n - 2)  # <-- 呼叫自己

# print(fibonacci(6))

# print(R_fibonacci(6))

#endregion 遞迴

#region 產生器
# def even_number(n):
#     i=1 
#     while i<=n:
#         if i%2 ==0:
#             yield i # <-在𫍇裡
#         i+=1

# numbers=even_number(10)
# print(numbers)            
# print(next(numbers)) 

# for n in even_number(10):
#     print(n)

# ls=[n for n in even_number(10)]
# print(ls)

# def fibonacci(n):
#     i=0 
#     a,b = 0,1 
#     while i<=n:
#         yield a 
#         a,b=b,a+b 
#         i+=1
# ls=[n for n in fibonacci(10)]
# print(ls)       

#endregion 產生器

#region 偏函數與柯里化


#endregion 偏函數與柯里化