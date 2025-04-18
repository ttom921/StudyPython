# # 簡易版

# for n in range(5):
#     print("*"*(n+1))

#  #標準版

# for n in range(5):
#     print(" "*(4-n)+ "*"*(2*n+1))

# #標準版

# for n in range(5):
#     print(f'{"*"*(2*n+1):^15}')

# 進階版

# for n in range(5):
#     print(" "*(4-n)+"*"*(2*n+1))  
# print(" "*4+"*")   # 樹幹
# print(" "*4+"*")     # 樹幹 

# # 進階版（使用 F 字串）
# for n in range(5):
#     print(f'{"*"*(2*n+1):^15}')
# print(f'{"*":^15}')    # 樹幹
# print(f'{"*":^15}')    # 樹幹


# 《練習》猜數字

# import random

# answer = random.randint(1,100) # 隨機產生一個 1~100 的整數
# guess = int(input("請猜一個1～100的數字"))

# while guess !=answer:
#     if guess > answer:
#         print("太大了！")
#     else:
#         print("太小了")
#     guess = int(input("再猜一次："))

# print(f"恭喜你！猜對了！答案是 {answer}")

import random

answer = random.randint(1, 100)  # 隨機產生一個 1~100 的整數
guess = int(input("請猜一個 1~100 的數字："))

while True:
    if guess > answer:
        print("太大了！")
    elif guess < answer:
        print("太小了！")
    else:
        print(f"恭喜你！猜對了！答案是 {answer}")
        break   # Bingo! 猜對了！結束迴圈

    guess = int(input("再猜一次："))
