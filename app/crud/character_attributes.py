from sqlalchemy.orm import Session
from app.model.character_attributes import Character_Attributes as AttributeModel
from app.schema.character_attributes import Character_Attributes


async def get_attributes_by_id(db: Session, id_in: int):
    return db.query(AttributeModel).filter(AttributeModel.belongs_to == id_in).all()

async def create_attributes(db: Session, attribute_in: AttributeModel):

    attribute = AttributeModel(belongs_to = attribute_in.belongs_to,
                                attribute = attribute_in.attribute,
                                value = attribute_in.value)

    db.add(attribute)
    db.commit()
    db.refresh(attribute)

    return attribute