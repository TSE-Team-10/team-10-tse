from fastapi import FastAPI, APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schema.user import User
from app.crud.user import get_user_by_email
from app.crud.user import create_user as crud_create_user
from app.db.session import get_db

router = APIRouter(prefix="/user", tags=["user"])

# Get User Endpoint
@router.get("/{email}", response_model=User)
async def get_user(email: str,
            db: Session = Depends(get_db)):

    user = await get_user_by_email(db, email)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        return user

#Post User Endpoint
@router.post("/", response_model=User)
async def create_user(user: User,
                db: Session = Depends(get_db)):

    response = await crud_create_user(db, user)
    return response
