from pydantic import BaseModel

class VoterDataclass(BaseModel):
    id: str
    hasVoted: bool

class CandidateDataclass(BaseModel):
    name: str
    votes: int

class TotalVotesDataclass(BaseModel):
    number: int