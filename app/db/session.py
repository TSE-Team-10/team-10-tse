from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import sessionmaker, Session
import pymysql

db_source = 'mysql+pymysql://root:tse10@127.0.0.1:3306/CharGenWebsite'
engine = create_engine(db_source,
                       autocommit=False,
                       autoflush=False,
                       bind=engine)
def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close