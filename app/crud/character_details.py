from sqlalchemy.orm import Session
from app.model.character_details import Character_Details as DetailModel
from app.schema.character_details import Character_Details


async def get_details_by_id(db: Session, id_in: int):
    return db.query(DetailModel).filter(DetailModel.id_ == id_in).first()

async def create_details(db: Session, model_in: DetailModel):

    details = DetailModel(id_ = model_in.id_,
                            race = model_in.race,
                            class_= model_in.class_,
                            level = model_in.level)

    db.add(details)
    db.commit()
    db.refresh(details)

    return details