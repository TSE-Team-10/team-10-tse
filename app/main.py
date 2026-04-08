from datetime import timedelta
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.session.dbConn import conn
from pydantic import BaseModel
from typing import List, Annotated
import app.core.security as security
import app.core.deps as deps

from app.api import character_attributes, character_details, character_list, character_skills, user, token

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

app.include_router(character_attributes.router)
app.include_router(character_details.router)
app.include_router(character_skills.router)
app.include_router(character_list.router)
app.include_router(user.router)
app.include_router(token.router)