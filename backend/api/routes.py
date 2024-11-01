from fastapi import APIRouter, Depends, Response
from api.dataclasses import CandidateDataclass
from api.logic import voter_hasvoted, candidates, vote, voter_try_login, votes
from sqlalchemy.orm import Session
from db.sessions import get_session
import urllib.parse

router = APIRouter()

@router.post("/try-login/{voter_token:path}")
def get_voter_hasvoted(
    voter_token: str,
    session: Session = Depends(get_session),
) -> bool:
    return voter_try_login(session, urllib.parse.unquote(voter_token))

@router.get("/has-voted/{voter_token:path}")
def get_voter_hasvoted(
    voter_token: str,
    session: Session = Depends(get_session),
) -> bool:
    return voter_hasvoted(session, urllib.parse.unquote(voter_token))

@router.get("/candidates")
def get_candidates(
    session: Session = Depends(get_session),
) -> list[CandidateDataclass]:
    return [c.model_dump() for c in candidates(session)]

@router.post("/vote/{candidate_name:path}/{voter_token:path}")
def put_vote(
    voter_token: str,
    candidate_name: str,
    session: Session = Depends(get_session),
) -> bool:
    return vote(session, urllib.parse.unquote(voter_token), urllib.parse.unquote(candidate_name))

@router.get("/total-votes")
def get_total_amount_of_votes(
    session: Session = Depends(get_session),
) -> int:
    return votes(session)