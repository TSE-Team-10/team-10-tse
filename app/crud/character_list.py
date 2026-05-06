from sqlalchemy.orm import Session
from app.model.character_list import Character_List as ListModel
from app.schema.character_list import Character_List_Create, Character_List
from app.model.character_details import Character_Details as DetailModel

async def get_character_by_id(db: Session, id_in: int):
    return db.query(ListModel).filter(ListModel.id == id_in).first()

async def get_character_by_user(db: Session, email: str):
    return db.query(ListModel).filter(ListModel.belongs_to == email).all()

async def create_new_character(db: Session, character: Character_List_Create):

    db_character = ListModel(
        belongs_to=character.belongs_to
    )

    db.add(db_character)
    db.flush()

    db_details = DetailModel(
        id_=db_character.id_,
        name=character.details.name,
        race=character.details.race,
        class_=character.details.class_,
        level=character.details.level
    )

    db.add(db_details)
    db.commit()
    db.refresh(db_character)

    return Character_List(
        belongs_to=db_character.belongs_to,
        id_=db_character.id_
    )

async def delete_character_by_id(db: Session, id_in: int):

    target = db.query(ListModel).filter(ListModel.id_ == id_in).first()

    db.delete(target)
    db.commit()

    return target
