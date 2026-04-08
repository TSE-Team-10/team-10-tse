from fastapi import FastAPI, APIRouter
from app.schema.character_skills import Character_Skills

router = APIRouter(prefix="/character_skills", tags=["skills"])

# Get Character Skills by Character ID Endpoint
@router.get("/{character_id}", response_model=Character_Skills)
def get_character_skills(character_id: int):
    curr = conn.cursor()
    query = "SELECT * FROM CharGenWebsite.character_skills WHERE id = %s"
    curr.execute(query, (character_id,))
    result = curr.fetchone()
    if len(result) == 0:
        raise HTTPException(status_code=404, detail="Character not found")
    else:
        return {
            "id": result[0],
            "skill": result[1],
            "value": result[2]
        }


#Post Character Skills Endpoint
@router.post("/", response_model=Character_Skills)
def create_character_skills(character_skills: Character_Skills):
    curr = conn.cursor()
    query = "INSERT INTO CharGenWebsite.character_skills (character_id, skill, value) VALUES (%s,%s,%s)"
    try:
        curr.execute(query, (character_skills.character_id,character_skills.skill,character_skills.value))
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail="Error occured when inserting character skills in character_skills table")
    
    return {"character_id": character_skills.character_id, "skill": character_skills.skill, "value": character_skills.value}