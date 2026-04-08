from pydantic import BaseModel

class User(BaseModel):
    alias: str
    password_hash: str
    email: str