from pydantic import BaseModel

class Character_Attributes(BaseModel):
    id: int
    strength: int
    dexterity: int
    constitution: int
    intelligence: int
    wisdom: int
    charisma: int