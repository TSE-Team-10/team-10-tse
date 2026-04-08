from sqlalchemy.orm import Session
from app.model.character_list import Character_List as ListModel
from app.schema.character_list import Character_List

async def get_character_by_id(db: Session, id_in: int):
    return db.query(ListModel).filter(ListModel.id == id_in).first()

async def get_character_by_user(db: Session, email: str):
    return db.query(ListModel).filter(ListModel.belongs_to == email).all()

async def create_new_character(db: Session, character: Character_List):

    character = ListModel(belongs_to = character.belongs_to)

    db.add(character)
    db.commit()
    db.refresh(character)

    return character

async def delete_character_by_id(db: Session, id_in: int):

    target = db.query(ListModel).filter(ListModel.id_ == id_in).first()

    db.delete(target)
    db.commit()

    return target
