from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import time

DATABASE_URL = "mysql+pymysql://root:tse10@mariadb:3306/CharGenWebsite"

MAX_RETRIES = 10
RETRY_DELAY = 5  # seconds

for attempt in range(1, MAX_RETRIES + 1):
    try:
        engine = create_engine(DATABASE_URL, pool_pre_ping=True)
        # Test connection
        with engine.connect() as conn:
            print("Database connection successful!")
        break
    except Exception as e:
        print(f"Database connection failed (attempt {attempt}/{MAX_RETRIES}): {e}")
        if attempt == MAX_RETRIES:
            raise
        time.sleep(RETRY_DELAY)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close