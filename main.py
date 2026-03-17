from fastapi import FastAPI, HTTPException
from dbConn import conn
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Classes


class Character_List(BaseModel):
    id: int
    belongs_to:str





@app.get("/")
def root():
    return {"message": "Welcome to the Character Generator API!"}



# Get Characters by UUID Endpoint
@app.get("/character/{id_in}", response_model=Character_List)
def get_character_by_user_email(id_in:int):


        curr = conn.cursor()
        query = "SELECT id, belongs_to FROM CharGenWebsite.character_list WHERE id = %s"
        curr.execute(query, id_in)
        result = curr.fetchone()
        if result is None:
            raise HTTPException(status_code=404, detail="No characters found with this id.")
        else:
            return {"id": result[0], "belongs_to": result[1]}

        # Mock response for testing without database connection
        #return {"id": 0, "belongs_to": "JohnnyTest@Test.com"}
