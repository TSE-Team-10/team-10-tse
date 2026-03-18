from passlib.context import CryptContext

hashing = CryptContext(schemes=["argon2"], deprecated="auto")


def getPasswordHash(password):
    return hashing.hash(password)

def verifyPassword(plain_password, hashed_password):
    return hashing.verify(plain_password, hashed_password)