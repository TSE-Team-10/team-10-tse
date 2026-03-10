import MySQLdb

db_config = {
    'host': 'localhost',
    'user': 'root',
    'passwd': 'root',
    'db': 'temp'
}

conn = MySQLdb.connect(**db_config)