
# calobj=calendar.monthcalendar(year,month)
# print(type(calobj))

# print(calobj)

# msg = "Hello World"
# print(msg)

def __getEpochTime(year,month,day):
    import datetime
    import calendar
    import time
    strtime=f"{year}-{month}-{day:02d} 00:00:00"
    # 取得GMT的時間
    dt = datetime.datetime.strptime(f"{strtime}", "%Y-%m-%d %H:%M:%S")
    #print(dt) 
    gmttime=calendar.timegm(dt.timetuple())
    #print(gmttime)
    return gmttime
def __getEpochtimeDay(year,month,day):
    import datetime
    import calendar
    import time
    starttime=f"{year}-{month}-{day:02d} 00:00:00"
    endtime=f"{year}-{month}-{day:02d} 23:59:59"
    # 取得GMT的時間
    startdt = datetime.datetime.strptime(f"{starttime}", "%Y-%m-%d %H:%M:%S")
    enddt=datetime.datetime.strptime(f"{endtime}", "%Y-%m-%d %H:%M:%S")
    startgmt=calendar.timegm(startdt.timetuple())
    endgmt=calendar.timegm(enddt.timetuple())
    return startgmt,endgmt


def test_convertyearmonthtoutc():
    import datetime
    import calendar
    import time
    # 一個月有幾天
    year='2021'
    month='01'
    monthRange = calendar.monthrange(int(year),int(month))
    print(monthRange)
    smonth=monthRange[0]+1
    # str=f'{smonth:02d}'
    # print(str)
    #f"I am {first_name} {middle_name}. {last_name}"
    starstrtime=f"{year}-{month}-{1:02d} 00:00:00"
    print(starstrtime)
    # 取得GMT的時間
    dt = datetime.datetime.strptime(f"{starstrtime}", "%Y-%m-%d %H:%M:%S")
    print(dt) 
    startgmt=calendar.timegm(dt.timetuple())
    print(startgmt)
    # # 取得GMT的時間
    # dt = datetime.datetime.strptime("2021-01-13 00:00:00", "%Y-%m-%d %H:%M:%S")
    # print(dt)
    gmttime=__getEpochTime(year,month,monthRange[0]+1)
    print(gmttime)
    print("========================")
    gmttupl=__getEpochtimeDay(year,month,monthRange[0]+1)
    print(gmttupl[0])
    print(gmttupl[1])

#======================================================
def test_utc():
    import datetime
    import calendar
    import time
    # 取得GMT的時間
    dt = datetime.datetime.strptime("2021-01-13 00:00:00", "%Y-%m-%d %H:%M:%S")
    bbb=calendar.timegm(dt.timetuple())
    print(bbb)

def test_calendar():
    import calendar
    # 一個月有幾天
    year='2021'
    month='02'
    monthRange = calendar.monthrange(int(year),int(month))
    print(monthRange)
    print(monthRange[1])

#test_calendar()    
#test_utc()
test_convertyearmonthtoutc()
