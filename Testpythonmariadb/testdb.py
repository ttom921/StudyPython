#
# import MySQLdb
# db=MySQLdb.connect(passwd="moonpie",db="thangs")

# import mysql.connector as mariadb

# mariadb_connection = mariadb.connect(user='python_user', password='some_pass', database='employees')
# cursor = mariadb_connection.cursor()



import MySQLdb
mariadb_connection = MySQLdb.connect(user='root', password='12345678', database='employees')

cursor = mariadb_connection.cursor()

#retrieving information
some_name = 'Georgi'
cursor.execute("SELECT first_name,last_name FROM employees WHERE first_name=%s", (some_name,))

for first_name, last_name in cursor:
    print("First name: "+first_name +" , Last name: "+last_name)

#insert information
try:
    cursor.execute("INSERT INTO employees (emp_no,birth_date,first_name,last_name,hire_date) VALUES (%s,%s,%s,%s,%s)", ('12345678','1973-12-12','Maria','DB','1988-12-12'))
except MySQLdb.Error as error:
    print("Error: {}".format(error))

mariadb_connection.commit()
#print("The last inserted id was: "+ str(cursor.lastrowid))

mariadb_connection.close()