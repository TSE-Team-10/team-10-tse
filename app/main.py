from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.session.dbConn import conn
from pydantic import BaseModel
from typing import List
import app.core.security as security
from app.model.user import User
from app.model.character_attributes import Character_Attributes
from app.model.character_details import Character_Details
from app.model.character_list import Character_List, Character_List_Create
from app.model.character_skills import Character_Skills

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


@app.get("/")
def root():
    return {"message": "Welcome to the Character Generator API!"}


# Get User Endpoint
@app.get("/user/{email}", response_model=User)
def get_user(email: str):
    curr = conn.cursor()
    query = "SELECT * FROM CharGenWebsite.user WHERE email = %s"
    curr.execute(query, (email,))
    result = curr.fetchone()
    if len(result) == 0:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        return {"alias": result[0], "password_hash": result[1], "email": result[2]}

    # Mock response for testing without database connection
    # return {"alias": "test", "password_hash": "test", "email": email}

# Get Characters by UUID Endpoint
@app.get("/characters/{user_email}", response_model=List[Character_List])
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

# Get Character Attributes by Character ID Endpoint
@app.get("/character_attributes/{character_id}", response_model=Character_Attributes)
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

    # Mock response for testing without database connection
    # return {
    #     "id": character_id,
    #     "strength": 10,
    #     "dexterity": 10,
    #     "constitution": 10,
    #     "intelligence": 10,
    #     "wisdom": 10,
    #     "charisma": 10
    # }

# Get Character Details by Character ID Endpoint
@app.get("/character_details/{character_id}", response_model=Character_Details)
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

    # Mock response for testing without database connection
    # return {
    #     "id": character_id,
    #     "name": "Test Character",
    #     "race": "Human",
    #     "char_class": "Fighter",
    #     "level": "1"
    # }

# Get Character Skills by Character ID Endpoint
@app.get("/character_skills/{character_id}", response_model=Character_Skills)
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
            "acrobatics": result[1],
            "animal_handling": result[2],
            "arcana": result[3],
            "athletics": result[4],
            "deception": result[5],
            "history": result[6],
            "insight": result[7],
            "intimidation": result[8],
            "investigation": result[9],
            "medicine": result[10],
            "nature": result[11],
            "perception": result[12],
            "religion": result[13],
            "sleight_of_hand": result[14],
            "stealth": result[15],
            "survival": result[16]
        }

    # Mock response for testing without database connection
    # return {
    #     "id": character_id,
    #     "acrobatics": 0,
    #     "animal_handling": 0,
    #     "arcana": 0,
    #     "athletics": 0,
    #     "deception": 0,
    #     "history": 0,
    #     "insight": 0,
    #     "intimidation": 0,
    #     "investigation": 0,
    #     "medicine": 0,
    #     "nature": 0,
    #     "perception": 0,
    #     "religion": 0,
    #     "sleight_of_hand": 0,
    #     "stealth": 0,
    #     "survival": 0
    # }



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


#Post User Endpoint
@app.post("/user/", response_model=User)
def create_user(user: User):
    # Hash the password before storing it in the database
    user.password_hash = security.getPasswordHash(user.password_hash)
    # Database insertion
    curr = conn.cursor()
    query = "INSERT INTO CharGenWebsite.user (alias, password_hash, email) VALUES (%s, %s, %s)"
    try:
        curr.execute(query, (user.alias, user.password_hash, user.email))
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail="Error occurred while inserting user.")

    return {"alias": user.alias, "password_hash": user.password_hash, "email": user.email}


#Post Character Attributes
@app.post("/character_attributes", response_model=Character_Attributes)
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

#Post Character Endpoint
@app.post("/characters/", response_model=Character_List_Create)
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
