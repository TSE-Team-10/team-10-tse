from pydantic import BaseModel

class Character_Skills(BaseModel):
    id: int
    skill: str
    value: int