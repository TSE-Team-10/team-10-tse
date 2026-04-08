from sqlalchemy.orm import Session
from app.model.character_skills import Character_Skills as SkillModel
from app.schema.character_skills import Character_Skills


async def get_skills_by_id(db: Session, id_in: int):
    return db.query(SkillModel).filter(SkillModel.character_id == id_in).all()

async def create_skill(db: Session, skill_in: SkillModel):

    skill = SkillModel(character_id = skill_in.character_id,
                                skill = skill_in.skill,
                                value = skill_in.value)

    db.add(skill)
    db.commit()
    db.refresh(skill)

    return skill