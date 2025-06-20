from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Date, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from typing import List, Optional
import os
from datetime import datetime

# Configuração do banco de dados
DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql://gremio_user:gremio_password@postgres:5432/gremio_db"
)
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Modelo SQLAlchemy
class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    rodada = Column(Integer, nullable=False)
    data = Column(Date, nullable=False)
    adversario = Column(String, nullable=False)
    local = Column(String, nullable=False)
    resultado = Column(String, nullable=True)
    is_home = Column(Boolean, nullable=False)


# DTOs (Data Transfer Objects)
class MatchBase(BaseModel):
    rodada: int
    data: str
    adversario: str
    local: str
    resultado: Optional[str] = None
    is_home: bool


class MatchCreate(MatchBase):
    pass


class MatchResponse(MatchBase):
    id: int

    model_config = {"from_attributes": True}

    @classmethod
    def from_match_model(cls, match):
        return cls(
            id=match.id,
            rodada=match.rodada,
            data=match.data.strftime("%Y-%m-%d") if match.data else None,
            adversario=match.adversario,
            local=match.local,
            resultado=match.resultado,
            is_home=match.is_home,
        )


# Criar tabelas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Grêmio Brasileirão 2025 API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"message": "Grêmio Brasileirão 2025 API"}


@app.get("/matches", response_model=List[MatchResponse])
def get_matches(db: Session = Depends(get_db)):
    matches = db.query(Match).all()
    return [MatchResponse.from_match_model(match) for match in matches]


@app.get("/matches/home", response_model=List[MatchResponse])
def get_home_matches(db: Session = Depends(get_db)):
    matches = db.query(Match).filter(Match.is_home == True).all()
    return [MatchResponse.from_match_model(match) for match in matches]


@app.get("/matches/away", response_model=List[MatchResponse])
def get_away_matches(db: Session = Depends(get_db)):
    matches = db.query(Match).filter(Match.is_home == False).all()
    return [MatchResponse.from_match_model(match) for match in matches]


@app.get("/matches/turno/{turno}", response_model=List[MatchResponse])
def get_matches_by_turno(turno: int, db: Session = Depends(get_db)):
    if turno == 1:
        matches = db.query(Match).filter(Match.rodada <= 19).all()
    elif turno == 2:
        matches = db.query(Match).filter(Match.rodada > 19).all()
    else:
        raise HTTPException(status_code=400, detail="Turno deve ser 1 ou 2")

    return [MatchResponse.from_match_model(match) for match in matches]


@app.post("/matches", response_model=MatchResponse)
def create_match(match: MatchCreate, db: Session = Depends(get_db)):
    db_match = Match(**match.dict())
    db.add(db_match)
    db.commit()
    db.refresh(db_match)
    return db_match


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
