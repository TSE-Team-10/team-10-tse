from fastapi import FastAPI, APIRouter
from app.model.character_details import Character_Details

router = APIRouter(prefix="/character_details", tags=["details"])
# Get Character Details by Character ID Endpoint
@router.get("/{character_id}", response_model=Character_Details)
def get_character_details(character_id: int):
    curr = conn.cursor()
    query = "SELECT * FROM CharGenWebsite.character_details WHERE id = %s"
    curr.execute(query, (character_id,))
    result = curr.fetchone()
    if len(result) == 0:
        raise HTTPException(status_code=404, detail="Character not found")
    else:
        return {
            "id": result[0],
            "name": result[1],
            "race": result[2],
            "char_class": result[3],
            "level": result[4]
        }

#Post Character Details
@router.post("/", response_model=Character_Details)
def create_character_details(character_details: Character_Details):

    curr = conn.cursor()
    query = "INSERT INTO CharGenWebsite.character_details (id, name, race, class, level) VALUES (%s,%s,%s,%s,%s)"
    try:
        curr.execute(query, (character_details.id,character_details.name,character_details.race,character_details.char_class,character_details.level))
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail="Error occured while inserting into character_details table")
    
    return {"id": character_details.id, "name": character_details.name, "race": character_details.race, "class": character_details.char_class, "level": character_details.level}