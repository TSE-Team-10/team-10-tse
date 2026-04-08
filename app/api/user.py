from fastapi import FastAPI, APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schema.user import User
from app.crud.user import get_user_by_email
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
def create_user(user: User):
    # Hash the password before storing it in the database
    user.password_hash = security.getPasswordHash(user.password_hash)
    # Database insertion
    curr = conn.cursor()
    query = "INSERT INTO CharGenWebsite.user (alias, password_hash, email) VALUES (%s, %s, %s)"
    try:
        curr.execute(query, (user.alias, user.password_hash, user.email))
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail="Error occurred while inserting user.")

    return {"alias": user.alias, "password_hash": user.password_hash, "email": user.email}
