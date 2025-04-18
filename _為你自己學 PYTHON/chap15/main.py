#region 使用情境
# class Cat:
#     def __init__(self,name,age):
#         self.name=name
#         self.age=age

# kitty=Cat("凱蒂",18)


#endregion 使用情境


#region 非資料描述器
# class AgeValue:
#     def __get__(self,obj,obj_type):
#         return 18
    
# class Cat:
#     age=AgeValue()


# kitty=Cat()
# print(kitty.__dict__)
# print(kitty.age)

# class AgeValue:
#     pass
      
# class Cat:
#     age=AgeValue()


# kitty=Cat()
# print(kitty.age)


#endregion 非資料描述器

#region 資料描述器
class AgeValue:
    def __init__(self, age=0):
      self._age = age
    def __get__(self,obj,obj_type):
       return self._age
    def __set__(self,obj,value):
       if value  <0 or value >150:
          raise ValueError("年齡超過範圍")
       self._age=value

class Cat:
   age=AgeValue()

kitty=Cat()
print(kitty.__dict__)       
print(kitty.age)

kitty.age=18
print(kitty.__dict__)     
print(kitty.age)

kitty.age=1000
#endregion 資料描述器