from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dbConn import conn
from pydantic import BaseModel
from typing import List

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5500",
    "http://localhost:8000",
    "http://localhost",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Classes

class User(BaseModel):
    alias: str
    password_hash: str
    email: str

class Character_List(BaseModel):
    id: int
    belongs_to:str

class Character_Attributes(BaseModel):
    id: int
    strength: int
    dexterity: int
    constitution: int
    intelligence: int
    wisdom: int
    charisma: int

class Character_Details(BaseModel):
    id: int
    name: str
    race: str
    char_class: str
    level : str

class Character_Skills(BaseModel):
    id: int
    acrobatics: int
    animal_handling: int
    arcana: int
    athletics: int
    deception: int
    history: int
    insight: int
    intimidation: int
    investigation: int
    medicine: int
    nature: int
    perception: int
    religion: int
    sleight_of_hand: int
    stealth: int
    survival: int



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
