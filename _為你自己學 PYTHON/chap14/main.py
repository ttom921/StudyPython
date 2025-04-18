# class Cat:
#     count=0 
#     actions=[] 
#     def __init__(self,name,color,age):
#         self.name=name
#         self.color=color 
#         self.age=age 
#         Cat.count+=1
#     def speak(self,sound="喵"):
#         print(f"我是{self.name},{sound}")

# kitty=Cat("凱蒂","白色",18)
# nancy=Cat("南茜","黑色",20)
# print(kitty.name)
# print(nancy.color)
                  
# kitty.speak()
# nancy.speak("汪!")
# print(Cat.count)


# region 屬性裝飾器
# class Hero:
#     def __init__(self,title,name,age):
#         self.title=title 
#         self.name=name 
#         self._age=age 

#     @property #<--掛在這裡會得到getter
#     def age(self):
#         return self._age    
#     @age.setter # <--諍是 setter
#     def age(self,age):
#         if age<=0 or age >120:
#             raise ValueError("年齡設定錯誤")
#         self._age=age

# himmel =Hero("勇者","欣梅爾",18)
# # print(himmel.__dict__)
# himmel.age=38

# himmel.age=1000

# endregion 屬性裝飾器

# region 函數與方法
# class Duck:
#     def say_hello(self):
#         print("Hello,I'm a duck!")

# donald=Duck()

# endregion 函數與方法


# region 類別方法與靜態方法

# class Duck:
#     def all():
#         print("鴨子們，集合囉！")
#     @classmethod
#     def list(cls):
#         print(f"{cls.__name__}們，集合囉！")

#     @staticmethod
#     def make_sound(sound="呱呱呱")
#         print(sound)        
# Duck.all()        


# endregion 類別方法與靜態方法


# region 繼承

# class Primate:
#     def grab(self,something=None):
#         if something:
#             return f"抓{something}"
#         return "㧓東西"

# class Human(Primate):
#     pass
# class Monkey(Primate):
#     pass 

# goku= Monkey()
# someone=Human()

# print(goku.grab("香蕉"))
# print(someone.grab("錢錢"))
# endregion 繼承

# region 執行上層類別的方法
# class Animal:
#     def walk(self):
#         print("Animal is walking")
#     def eat(self,food):
#         print(f"{food} is yummy!")

# class Cat(Animal):
#           def walk(self):
#             super().eat("罐罐")
#             print("Cat is walking")            

# endregion 執行上層類別的方法

# region 你是我的後代嗎
# class Animal:
#     pass

# class Bird(Animal):
#     pass
# class Mammal(Animal):
#     pass
# class Cat(Animal):
#     pass

# print(issubclass(Cat,Mammal))
# print(issubclass(Cat,Animal))
# print(issubclass(Cat,Bird))
# print(issubclass(Cat,object))

# kitty=Cat()

# print(isinstance(kitty, Cat))
# print(isinstance(kitty, Bird))
# print(isinstance(kitty, Animal))
# print(isinstance(kitty, object))
# endregion 你是我的後代嗎

# region 多重繼承
# class Animal:
#     def sleep(self):
#         print("Zzzzz")

# class Bird(Animal):
#     def fly(self):
#         print("I blieve I can fly ♫♪")

# class Fish(Animal):
#     def dive(self):
#         print("Dive!!")

# class Cat(Bird, Fish):
#     pass

# ketty=Cat()

# 鑽石問題
# class Animal:
#     def sleep(self):
#         print("Zzzzz")

# class Bird(Animal):
#     def sleep(self):
#         print("我可以站著睡覺")

# class Fish(Animal):
#     def sleep(self):
#         print("我睡覺不用閉眼睛")

# class Cat(Bird, Fish):
#     pass

# kitty=Cat()
# kitty.sleep()#我可以站著睡覺

class Animal:
    def sleep(self):
        print("Zzzzz")

class Bird(Animal):
    pass

class Fish(Animal):
    def sleep(self):
        print("我睡覺不用閉眼睛")

class Cat(Bird, Fish):
    def sleep(self):
        super().sleep()

kitty=Cat()
kitty.sleep()

# endregion 多重繼承