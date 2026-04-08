from fastapi import FastAPI, APIRouter
from app.model.user import User
router = APIRouter(prefix="/user", tags=["user"])

# Get User Endpoint
@router.get("/{email}", response_model=User)
def get_user(email: str):
    curr = conn.cursor()
    query = "SELECT * FROM CharGenWebsite.user WHERE email = %s"
    curr.execute(query, (email,))
    result = curr.fetchone()
    if len(result) == 0:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        return {"alias": result[0], "password_hash": result[1], "email": result[2]}

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
