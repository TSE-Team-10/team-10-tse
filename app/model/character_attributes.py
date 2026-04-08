from __future__ import annotations
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class Character_Attributes(Base):
    __tablename__: str = "character_attributes"

    id_: Mapped[int] = mapped_column("id", Integer)
    belongs_to: Mapped[int] = mapped_column(Integer,
                                    ForeignKey("character_list.id"),
                                    nullable=False,
                                    index=True,
                                    primary_key=True
                                    )
    
    attribute: Mapped[str] = mapped_column(String(50),
                                        primary_key=True)
    value: Mapped[int] = mapped_column(Integer)