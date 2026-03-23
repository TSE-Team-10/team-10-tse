from pydantic import BaseModel

class Character_Details(BaseModel):
    id: int
    name: str
    race: str
    char_class: str
    level : int
