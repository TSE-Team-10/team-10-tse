from sqlalchemy.orm import Session
from app.model.user import User as UserModel
from app.schema.user import User
from app.core.security import getPasswordHash

async def get_user_by_email(db: Session, email: str):
    return db.query(UserModel).filter(UserModel.email == email).first()

async def create_user(db: Session, user_in: User):

    user = UserModel(email = user_in.email,
                    password_hash=getPasswordHash(user_in.password_hash),
                    alias=user_in.alias)

    db.add(user)
    db.commit()
    db.refresh(user)

    return user