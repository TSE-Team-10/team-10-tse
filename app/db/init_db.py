from app.db.base import Base
from app.db.session import engine

# Creates tables in the database which do not yet exist
def init_db():
    Base.metadata.create_all(bind=engine)