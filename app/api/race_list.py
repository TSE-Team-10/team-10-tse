from fastapi import FastAPI, APIRouter, status, Depends
from typing import Annotated
from app.schema.race_list import Race_List
from app.crud.race_list import get_races as crud_get_races

router = APIRouter(prefix="/race_list", tags=["race_list"])

@router.get("/", response_model=list[Race_List])
def get_races():
    
    return crud_get_races()