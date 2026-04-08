from fastapi import FastAPI, APIRouter
from app.model.character_attributes import Character_Attributes

router = APIRouter(prefix="/character_attributes", tags=["attributes"])
# Get Character Attributes by Character ID Endpoint
@router.get("/{character_id}", response_model=Character_Attributes)
def get_character_attributes(character_id: int):
    curr = conn.cursor()
    query = "SELECT * FROM CharGenWebsite.character_attributes WHERE id = %s"
    curr.execute(query, (character_id,))
    result = curr.fetchone()
    if len(result) == 0:
        raise HTTPException(status_code=404, detail="Character not found")
    else:
        return {
            "id": result[0],
            "strength": result[1],
            "dexterity": result[2],
            "constitution": result[3],
            "intelligence": result[4],
            "wisdom": result[5],
            "charisma": result[6]
        }

#Post Character Attributes
@router.post("/", response_model=Character_Attributes)
def create_character_attributes(character_attributes: Character_Attributes):
    curr = conn.cursor()
    query = "INSERT INTO CharGenWebsite.character_attributes (belongs_to, attribute, value) VALUES (%s,%s,%s)"
    try:
        curr.execute(query, (character_attributes.belongs_to, character_attributes.attribute, character_attributes.value))
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)})")
    
    return {"belongs_to": character_attributes.belongs_to, "attribute": character_attributes.attribute, "value": character_attributes.value }