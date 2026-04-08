from pydantic import BaseModel

class Character_Attributes(BaseModel):
    belongs_to: int
    attribute: str
    value: int