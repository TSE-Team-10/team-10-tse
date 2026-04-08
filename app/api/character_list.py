from fastapi import FastAPI, APIRouter
from app.model.character_list import Character_List, Character_List_Create

router = APIRouter(prefix="/character_list", tags=["character list"])

#Get Characters by UUID Endpoint
@router.get("/{user_email}", response_model=list[Character_List])
def get_character_by_user_email(user_email: str):
    curr = conn.cursor()
    query = "SELECT id, belongs_to FROM CharGenWebsite.character_list WHERE belongs_to = %s"
    curr.execute(query, (user_email,))
    results = curr.fetchall()
    if len(results) == 0:
        raise HTTPException(status_code=404, detail="No characters found for this user")
    else:
        return [{"id": result[0], "belongs_to": result[1]} for result in results]

    # Mock response for testing without database connection
    # return [{"id": 1, "belongs_to": user_email}, {"id": 2, "belongs_to": user_email}]

# Get Characters by UUID Endpoint
@router.get("/{id_in}", response_model=Character_List)
def get_character_by_id(id_in:int):


        curr = conn.cursor()
        query = "SELECT id, belongs_to FROM CharGenWebsite.character_list WHERE id = %s"
        curr.execute(query, id_in)
        result = curr.fetchone()
        if result is None:
            raise HTTPException(status_code=404, detail="No characters found with this id.")
        else:
            return {"id": result[0], "belongs_to": result[1]}


#Post Character Endpoint
@router.post("/", response_model=Character_List_Create)
def create_character(character: Character_List_Create):
    curr = conn.cursor()
    query = "INSERT INTO CharGenWebsite.character_list (belongs_to) VALUES (%s)"
    try:
        curr.execute(query,(character.belongs_to))
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail="Error occured while inserting character to character_list")
    


    return {"belongs_to": character.belongs_to}

# Delete Character by Character ID Endpoint
@router.delete("/{character_id}")
def delete_character(character_id: int):
    if get_character_by_id(character_id):
        curr = conn.cursor()
        query = "DELETE FROM CharGenWebsite.character_list WHERE id = %s"
        curr.execute(query, (character_id))
        return f"Character {character_id} deleted"
    else:
        return "Character not found"