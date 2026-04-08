from sqlalchemy.orm import Session
from app.model.user import User as UserModel

async def get_user_by_email(db: Session, email: str):
    return db.query(UserModel).filter(UserModel.email == email).first()
