from pydantic import BaseModel, Field
from typing import Optional

class AbilityScoreIncrease(BaseModel):
    ability: str
    bonus: int

class Subraces(BaseModel):
    Subrace_Name: str = Field(alias="Subrace Name")
    Ability_Score_Increase: list[AbilityScoreIncrease] = Field(alias="Ability Score Increase")
    Features: list[str]

class Race_List(BaseModel):
    Name: str
    Subraces: list[Subraces]
    Ability_Score_Increase: list[AbilityScoreIncrease] = Field(alias="Ability Score Increase")
    Speed: int
    Features: list[str]