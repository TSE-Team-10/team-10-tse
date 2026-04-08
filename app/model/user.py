from __future__ import annotations
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class User(Base):
    __tablename__: str = "user"

    alias: Mapped[str] = mapped_column(String(45),
                                        nullable=False,
                                        index=True)

    password_hash: Mapped[str] = mapped_column(String(45),
                                                nullable=False)

    email: Mapped[str] = mapped_column(String(45), 
                                        unique=True, 
                                        index=True, 
                                        nullable=False,
                                        primary_key=True)



