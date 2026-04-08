from __future__ import annotations
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class Character_List(Base):
    __tablename__: str = "character_list"

    id_: Mapped[int] = mapped_column("id",Integer,
                                        nullable=False,
                                        index=True,
                                        primary_key=True)

    belongs_to: Mapped[str] = mapped_column(String(50),
                                            ForeignKey("user.email"),
                                            nullable=False,
                                            )

