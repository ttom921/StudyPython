# #region 製作自己的錯誤類別

# class PokemonCardError(Exception):
#     def __init__(self,message,code):
#         self.message=message 
#         self.code=code 
#     def __str__(self):
#         return f"{self.message} (error code:{self.code})"    

# raise PokemonCardError("噴火龍卡無法使用",code=418)

# #endregion 製作自己的錯誤類別

#region 製錯誤處理
# try:
#   1/0 #這行會出錯
# except:
#   print("出事了阿伯 ！")

# print("Hello Kitty")

# try:
#   1/0 #這行會出錯
# except ZeroDivisionError as err:
#   print(f"出事了阿伯 ！ 原因:{err}")

# print("Hello Kitty")


# try:
#   1/0 #這行會出錯
# except (ZeroDivisionError,NameError) as err:
#   print(f"出事了阿伯 ！ 原因:{err}")
# except NameError as err:
#   print(f"出事了阿伯 ！ 原因:{err}")
    

# print("Hello Kitty")

# try:
#   1/0 #這行會出錯
# except (ZeroDivisionError,NameError) as err:
#   print(f"出事了阿伯 ！ 原因:{err}")

# print("Hello Kitty")

# try:
#   1/0 #這行會出錯
# except (ZeroDivisionError,NameError) as err:
#   print(f"出事了阿伯 ！ 原因:{err}")
# except:
#   # 這是一個通用的錯誤處理
#   print("出事了阿伯！")  

# print("Hello Kitty")


# try:
#   1/0 #這行會出錯
# except (ZeroDivisionError,NameError) as err:
#   print(f"出事了阿伯 ！ 原因:{err}")
# finally:
#   print("日子還是要下去")


try:
  1/1 #這行可以正常運作
except (ZeroDivisionError,NameError) as err:
  print(f"出事了阿伯 ！ 原因:{err}")
else:
  print("又是風和日麗的一天！")  
finally:
  print("日子還是要下去")

#endregion 製錯誤處理