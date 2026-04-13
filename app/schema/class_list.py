from pydantic import BaseModel, Field
from typing import Optional


class Proficiency_List(BaseModel):
    Armour: list[str] 
    Weapons: list[str] 
    Tools: list[str]
    Saving_Throw: list[str] = Field(alias="Saving throws")
    Skill_no: int = Field(alias="Skill no")
    Skills: list[str]

class Equipment_List(BaseModel):
    choices: list[list[str]]
    static: list[str]

class Class_List(BaseModel):
    Hit_Dice: str = Field(alias="Hit Dice")
    HP_level_1: str = Field(alias="HP level 1")
    HP_higher_levels: str = Field(alias="HP at higher levels")

    Features: list[str]

    Proficiencies: Proficiency_List
    Equipment: Equipment_List = Field(alias="Starting equipment choices")