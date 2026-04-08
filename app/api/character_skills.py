from fastapi import FastAPI, APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db

from app.schema.character_skills import Character_Skills
from app.crud.character_skills import get_skills_by_id, create_skill

router = APIRouter(prefix="/character_skills", tags=["skills"])
# Get Character skills by Character ID Endpoint
@router.get("/{character_id}", response_model=list[Character_Skills])
async def get_character_skills(character_id: int,
                                    db: Session = Depends(get_db)):
    response = await get_skills_by_id(db, character_id)
    return response


#Post Character Attributes
@router.post("/", response_model=Character_Skills)
async def create_character_skill(character_skills: Character_Skills,
                                        db: Session = Depends(get_db)):

    response = await create_skill(db, character_skills)

    return response 