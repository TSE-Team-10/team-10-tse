from fastapi import FastAPI, APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db

from app.schema.character_list import Character_List, Character_List_Create
from app.crud.character_list import get_character_by_id, get_character_by_user
from app.crud.character_list import create_new_character, delete_character_by_id
router = APIRouter(prefix="/character_list", tags=["character list"])

#Get Characters by UUID Endpoint
@router.get("/{user_email}", response_model=list[Character_List])
async def get_character_by_user_email(user_email: str,
                                db: Session = Depends(get_db)):

    response = await get_character_by_user(db, user_email)
    return response

# Get Characters by UUID Endpoint
@router.get("/{id_in}", response_model=list[Character_List])
async def get_character_by_id(id_in:int,
                        db: Session = Depends(get_db)):

    response = get_character_by_id(db, id_in)
    return response

#Post Character Endpoint
@router.post("/", response_model=Character_List_Create)
async def create_character(character: Character_List_Create,
                    db: Session = Depends(get_db)):

    response = await create_new_character(db, character)
    return response

# Delete Character by Character ID Endpoint
@router.delete("/{character_id}")
async def delete_character(character_id: int,
                    db: Session = Depends(get_db)):

    response = await delete_character_by_id(db, character_id)