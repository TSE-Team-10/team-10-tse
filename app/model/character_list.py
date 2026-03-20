from pydantic import BaseModel

class Character_List(BaseModel):
    id: int
    belongs_to:str