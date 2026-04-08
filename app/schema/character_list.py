from pydantic import BaseModel

class Character_List_Base(BaseModel):
    belongs_to: str


class Character_List(Character_List_Base):
    id_: int

class Character_List_Create(Character_List_Base):
    belongs_to: str
    class config:
        orm_mode = True