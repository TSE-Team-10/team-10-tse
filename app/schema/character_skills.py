from pydantic import BaseModel

class Character_Skills(BaseModel):
    character_id: int
    skill: str
    value: int