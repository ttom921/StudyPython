

#region 使用模組
# import greeting
# # greeting.hellowrold()
# # greeting.hi()

# print(greeting)
# # <module 'greeting' from 'D:\\Project\\github\\StudyPython\\_為你自己學 PYTHON\\chap13\\greeting.py'>
# print(type(greeting))
# # <class 'module'>
# print(dir(greeting))
# #['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', 
# # '__name__', '__package__', '__spec__', 'bye', 'hellowrold', 'hey', 'hi']

# import utils.greeting

# utils.greeting.hey()

# import utils.greeting as g 
# g.hey()
#endregion 使用模組


#region 只匯入部份功能

# from utils.greeting import hey 
# hey()

# from utils.greeting import hey,hi,hellowrold 
# hey()
# hi()
# hellowrold()

# from utils.greeting import *
# hey()
# hi()
# hellowrold()

#endregion 只匯入部份功能


#region 重複匯入模組
# import utils.greeting # 第一次匯入
# import utils.greeting # 再次匯入

# utils.greeting.hellowrold()


# import sys
# from utils import greeting
# from utils.greeting import hellowrold,hi, hey, bye
# hellowrold()
# print(sys.modules)
#endregion 重複匯入模組

#region 被匯入 vs 直接執行
# from utils import math


# import utils.greeting
# import utils.math
# import utils.loggers.simple_logger

# from utils import heroes
# print(heroes)

from utils.greeting import print_heroes
print_heroes()
#endregion 被匯入 vs 直接執行