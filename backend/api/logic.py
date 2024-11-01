from api.dataclasses import CandidateDataclass
from db.tables import Candidate, Voter, TotalVotes
from sqlalchemy import select
from sqlalchemy.orm import Session
from typing import TypeVar
from db.tables import AbstractModel
from itsme.itsme import get_itsme_name

# Create a generic type variable bound to subclasses of AbstractModel.
T = TypeVar("T", bound=AbstractModel)

def get(session: Session, object_type: type[T], ident: str) -> T:
    """
    General function for retrieving a single object from the database.
    The type of the object and its id as well a session object has to be provided.
    """
    generic_object: T | None = session.get(object_type, ident)
    return generic_object # can be None!

def get_all(session: Session, object_type: type[T]) -> list[T]:
    """
    General function for retrieving all objects of a certain type from the database.
    """
    return list(session.scalars(select(object_type)).all())

# ============================================================================ #

def voter_try_login(session: Session, voter_token: str) -> bool:
    voter_id = get_itsme_name(voter_token)
    result = get(session, Voter, voter_id)
    if result == None:
        session.add(Voter(id=voter_id))
        session.commit()
        return False
    else:
        return True

def voter_hasvoted(session: Session, voter_token: str) -> bool:
    voter_id = get_itsme_name(voter_token)
    return get(session, Voter, voter_id).to_dataclass().hasVoted

def candidates(session: Session) -> list[CandidateDataclass]:
    return [candidate.to_dataclass() for candidate in get_all(session, Candidate)]

def vote(session: Session, voter_token: str, candidate_name: str) -> bool:
    voter_id = get_itsme_name(voter_token)
    
    candidate = get(session, Candidate, candidate_name).to_dataclass() 
    voter = get(session, Voter, voter_id).to_dataclass()
    
    if voter.hasVoted:
        return False
    
    candidate_to_update = session.query(Candidate).filter(Candidate.name == candidate.name).first()
    candidate_to_update.votes += 1
    session.commit()

    total_votes_to_update = session.query(TotalVotes).first()
    total_votes_to_update.number += 1 # TODO: automatically?
    session.commit()

    voter_to_update = session.query(Voter).filter(Voter.id == voter.id).first()
    voter_to_update.hasVoted = True
    session.commit()
    
    return True

def votes(session: Session) -> int:
    return get_all(session, TotalVotes)[0].number






