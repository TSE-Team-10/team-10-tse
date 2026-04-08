from __future__ import annotations
from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column, ForeignKey
from app.db.base import Base

class Character_Skills(Base):
    __tablename__: str = "character_skills"

    character_id_: Mapped[int] = mapped_column( Integer,
                                    nullable=False,
                                    index=True,
                                    primary_key=True,
                                    ForeignKey("character_list.id"))
    
    skill: Mapped[str] = mapped_column(String(50),
                                        primary_key=True)
    value: Mapped[int] = mapped_column(int)