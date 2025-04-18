# year = int(input("請輸入年份："))

# if year % 4 ==0:
#     if year % 100 ==0:
#         if year % 400 ==0:
#             print("閏年")
#         else:
#             print("平年")
#     else:
#         print("閏年")
# else:
#     print("平年")

# if year %4 ==0 and year %100 !=0 or year %400 ==0:
#     print("閏年")
# else:
#     print("平年")    


# match 比對

# weather = "rain"

# if weather == "rain":
#     print("下雨天")
# elif weather == "sunny":
#     print("出太陽")
# elif weather == "cloudy":
#     print("多雲")
# else:
#     print("不知道")

# weather = "rain"

# match weather:
#     case "rain":
#         print("下雨天")
#     case "sunny":
#         print("出太陽")
#     case "cloudy":
#         print("多雲")       
#     case something:
#         print(f"我不知道 {something}")     

# weather = "rain"

# match weather:
#     case "rain":
#         print("下雨天")
#     case "sunny":
#         print("出太陽")
#     case "cloudy":
#         print("多雲")       
#     case _:
#         print(f"我根本不在乎是什麼大氣")          

# 比對型別        

# value = True

# if type(value) in [int, float]:
#     print("數字")
# elif type(value) == str:
#     print("字串")
# else:
#     print("我不知道你是誰")

# data=123

# match data:
#     case int() | float():
#         print("數字")
#     case str():
#         print("字串")
#     case _:
#         print("其它型別")   

# 比對結構             

# user_data=[1,"悟空",18]

# match user_data:
#     case [id,name,age]:
#         print(f"{id=} 我是{name}, 我今年{age}歲")
#     case _:
#         print("你好")

# user_data=[1,"悟空",18]
# match user_data:
#     case [id,_,_]:
#         print(f"會員編號{id}")
#     case _:
#         print("hi")    

# user_data={"name":"Kitty","gender":"female"}

# match user_data:
#     case {"gender":"male","name":name}:
#         print(f"{name} 先生您好！")
#     case {"gender":"female","name":name}:
#         print(f"{name} 女士您好！")
#     case _:
#         print("您好！")        

# number=[10,0]
# match number:
#     case x,y if y!=0:
#         print(x/y)
#     case _:
#         print("第二個數字不能零！")    

# number=[1,2,3,4,5]
# match number:
#     case _,*others:
#         print(others)
#     case _:
#         print("Hello python")    

def fib(n):
    match n:
        case n if n<2:
            return n
        case _:
            return fib(n-1)+fib(n-2)
        
print(fib(6))  # 第 6 項 = 8
print(fib(8))  # 第 8 項 = 21       