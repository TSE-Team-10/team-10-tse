from __future__ import annotations
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class Character_Skills(Base):
    __tablename__: str = "character_skills"

    character_id: Mapped[int] = mapped_column(Integer, 
                                                ForeignKey("character_list.id"),
                                                nullable=False,
                                                index=True,
                                                primary_key=True,
                                                )
    
    skill: Mapped[str] = mapped_column(String(50),
                                        primary_key=True)
    value: Mapped[int] = mapped_column(Integer)