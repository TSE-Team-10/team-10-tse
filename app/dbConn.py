import pymysql

db_config = {
    'host': 'localhost',
    'user': 'root',
    'passwd': 'tse10',
    'db': 'CharGenWebsite'
}

conn = pymysql.connect(**db_config)