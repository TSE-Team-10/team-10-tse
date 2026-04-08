from __future__ import annotations
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class Character_Attributes(Base):
    __tablename__: str = "character_details"

    id_: Mapped[int] = mapped_column("id", Integer,
                                    ForeignKey("character_list.id"),
                                        nullable=False,
                                        index=True,
                                        primary_key=True,
                                        )

    name: Mapped[str] = mapped_column(String(45))
    race: Mapped[str] = mapped_column(String(45))
    class_: Mapped[str] = mapped_column("class", String(45))
    level: Mapped[int] = mapped_column(Integer,
                                        nullable=False)