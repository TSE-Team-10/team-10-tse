from fastapi import FastAPI, APIRouter, status, Depends
from typing import Annotated
from app.schema.token import Token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/token", tags=["token"])
#Login Endpoint
@router.post("/")
async def logging_in_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = deps.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")