from sqlalchemy.orm import DeclarativeBase
from pydantic import BaseModel
from typing import Generic, TypeVar
from dataclasses import dataclass
from sqlalchemy.orm import Mapped, mapped_column
from abc import abstractmethod
from api.dataclasses import VoterDataclass, CandidateDataclass, TotalVotesDataclass

class Base(DeclarativeBase):
    """
    This class is meant to be inherited from to define the database tables.
    For usage, please check https://docs.sqlalchemy.org/en/20/orm/declarative_styles.html#using-a-declarative-base-class.
    """

D = TypeVar("D", bound=BaseModel)


@dataclass()
class AbstractModel(Generic[D]):
    """
    This class is meant to be inherited by the python classes for the database tables.
    It makes sure that every child implements the to_domain_model function
    and receives Pydantic data validation.
    """

    @abstractmethod
    def to_dataclass(self) -> D:
        """
        Change to an actual easy-to-use dataclass.
        This prevents working with instances of SQLAlchemy's Base class.
        """

@dataclass()
class Voter(Base, AbstractModel):
    __tablename__ = "Voter"
    # id: Identification number of the national Register
    id: Mapped[str] = mapped_column(primary_key=True)
    hasVoted: Mapped[bool] = mapped_column(default=False)

    def to_dataclass(self) -> VoterDataclass:
        return VoterDataclass(id=self.id, hasVoted=self.hasVoted)

@dataclass()
class Candidate(Base, AbstractModel):
    __tablename__ = "Candidate"
    name: Mapped[str] = mapped_column(primary_key=True)
    votes: Mapped[int] = mapped_column(default=0)

    def to_dataclass(self) -> CandidateDataclass:
        return CandidateDataclass(name=self.name, votes=self.votes)

@dataclass()
class TotalVotes(Base, AbstractModel):
    __tablename__ = "TotalVotes"
    number: Mapped[int] = mapped_column(primary_key=True)

    def to_dataclass(self) -> TotalVotesDataclass:
        return TotalVotesDataclass(number=self.number)