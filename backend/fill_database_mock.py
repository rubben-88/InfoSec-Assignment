from db.tables import Base, Voter, Candidate, TotalVotes
from db.engine import engine
from db.sessions import SessionLocal
from sqlalchemy import MetaData
from typing import List

if __name__ == "__main__":

    # first wipe database clean  !DANGER!
    meta = MetaData()
    meta.reflect(bind=engine)
    for tbl in reversed(meta.sorted_tables):
        tbl.drop(engine)


    Base.metadata.create_all(engine) # create tables

    session = SessionLocal() # create session

    # mock voters
    new_voters: List[Voter] = [
        Voter(id="Anne"),
        Voter(id="Bart"),
        Voter(id="Cedric", hasVoted=True),
        Voter(id="Dieter", hasVoted=True)
    ]

    for new_voter in new_voters:
        session.add(new_voter)
        session.commit()

    # mock candidates
    new_candidates: List[Candidate] = [
        Candidate(name="Petra De Sutter", votes=2),
        Candidate(name="Bart De Wever"),
        Candidate(name="Hilde Crevits")
    ]

    for new_candidate in new_candidates:
        session.add(new_candidate)
        session.commit()

    # mock total votes
    new_total_votes: TotalVotes = TotalVotes(number=2)
    session.add(new_total_votes)
    session.commit()