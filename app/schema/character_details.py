from pydantic import BaseModel
from typing import Optional

class Character_Details_Create(BaseModel):
    name: Optional[str] = None
    race: Optional[str] = None
    class_: Optional[str] = None
    level: Optional[int] = None

class Character_Details(Character_Details_Create):
    id_: int