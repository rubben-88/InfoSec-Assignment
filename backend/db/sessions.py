from collections.abc import Generator
from sqlalchemy.orm import Session, sessionmaker
from db.engine import engine

SessionLocal: sessionmaker[Session] = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_session() -> Generator[Session, None, None]:
    """
    Returns a generator for session objects.
    To be used as dependency injection.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()