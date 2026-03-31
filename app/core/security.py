from passlib.context import CryptContext

hashing = CryptContext(schemes=["argon2"], deprecated="auto")

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def getPasswordHash(password):
    return hashing.hash(password)

def verifyPassword(plain_password, hashed_password):
    return hashing.verify(plain_password, hashed_password)