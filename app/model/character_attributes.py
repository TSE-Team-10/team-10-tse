from __future__ import annotations
from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column, ForeignKey
from app.db.base import Base

class Character_List(Base):
    __tablename__: str = "character_attributes"

    id_: Mapped[int] = mapped_column("id", Integer,
                                        nullable=False,
                                        index=True,
                                        primary_key=True,
                                        ForeignKey("character_list.id"))

    name: Mapped[str] = mapped_column(String(45))
    race: Mapped[str] = mapped_column(String(45))
    class_: Mapped[str] = mapped_column("class", String(45))
    level: Mapped[int] = mapped_column(Integer,
                                        nullable=False)