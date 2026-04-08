from fastapi import FastAPI, APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schema.character_attributes import Character_Attributes
from app.crud.character_attributes import get_attributes_by_id, create_attributes


router = APIRouter(prefix="/character_attributes", tags=["attributes"])
# Get Character Attributes by Character ID Endpoint
@router.get("/{character_id}", response_model=list[Character_Attributes])
async def get_character_attributes(character_id: int,
                                    db: Session = Depends(get_db)):
    response = await get_attributes_by_id(db, character_id)
    return response


#Post Character Attributes
@router.post("/", response_model=Character_Attributes)
async def create_character_attributes(character_attributes: Character_Attributes,
                                        db: Session = Depends(get_db)):

    response = await create_attributes(db, character_attributes)

    return response 