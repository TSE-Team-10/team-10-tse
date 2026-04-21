from fastapi import FastAPI, APIRouter, status, Depends
from typing import Annotated
from app.schema.class_list import Class_List
from app.crud.class_list import get_classes as crud_get_classes

router = APIRouter(prefix="/class_list", tags=["class_list"])

@router.get("/", response_model=list[Class_List])
def get_classes():
    
    return crud_get_classes()