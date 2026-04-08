from datetime import datetime, timedelta, timezone

from passlib.context import CryptContext
import jwt
from app.main import get_user

hashing = CryptContext(schemes=["argon2"], deprecated="auto")

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def getPasswordHash(password):
    return hashing.hash(password)

def verifyPassword(plain_password, hashed_password):
    return hashing.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(email: str, password: str):
    user = get_user(email)
    if not user:
        verifyPassword(password, user["password_hash"])
        return False
    if not verifyPassword(password, user["password_hash"]):
        return False
    return user