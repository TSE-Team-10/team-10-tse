from fastapi import FastAPI, APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schema.character_details import Character_Details
from app.crud.character_details import get_details_by_id, create_details
router = APIRouter(prefix="/character_details", tags=["details"])


# Get Character Details by Character ID Endpoint
@router.get("/{character_id}", response_model=Character_Details)
async def get_character_details(character_id: int,
                            db: Session = Depends(get_db)):
    response = await get_details_by_id(db, character_id)
    return response

#Post Character Details
@router.post("/", response_model=Character_Details)
async def create_character_details(character_details: Character_Details,
                            db: Session = Depends(get_db)):


    response = await create_details(db, character_details)

    return response 