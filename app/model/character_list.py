from __future__ import annotations
from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column, ForeignKey
from app.model.base import Base

class Character_List(Base):
    __tablename__: str = "character_list"

    id_: Mapped[int] = mapped_column("id",Integer,
                                        nullable=False,
                                        index=True,
                                        primary_key=True)

    belongs_to: Mapped[str] = mapped_column(String(50),
                                        nullable=False,
                                        ForeignKey("user.email"))

