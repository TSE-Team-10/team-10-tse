from pydantic import BaseModel
from typing import Optional

class Character_Details(BaseModel):
    id_: int
    name: Optional[str] = None
    race: Optional[str] = None
    char_class: Optional[str] = None
    level: Optional[int] = None