from pydantic import BaseModel
from app.schema.character_details import Character_Details, Character_Details_Create
from typing import Optional
class Character_List_Base(BaseModel):
    belongs_to: str


class Character_List(Character_List_Base):
    id_: int

class Character_List_Create(Character_List_Base):
    belongs_to: str
    details: Character_Details_Create

class Character_List_Detailed(Character_List_Base):
    belongs_to: str
    details: Character_Details
