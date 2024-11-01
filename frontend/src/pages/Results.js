import '../css/general.css'
import '../css/Results.css'
import { useEffect, useState } from 'react';
import { candidate_names } from '../requests/requests';
import { useNavigate } from 'react-router-dom';

export default function Results() {

    const navigate = useNavigate();

    const [candidateList, setCandidateList] = useState(undefined)

    useEffect(() => {
        let ignore = false;

        candidate_names((result) => {
            setCandidateList(result)
        }, () => {navigate('/error')})

        return () => {
            ignore = true;
        }
    }, [])

    return (
        <div className='content center'>
            <div className='card spaced-column center'>

                <div className='title'>
                    Voting results:
                </div>

                {candidateList === undefined
                    ? <div className='loading'>Loading...</div>
                    : <div className='column'>
                        {candidateList.map(c => <div className='row'>
                            <div className='name'>{c.name}</div> | {c.votes}
                        </div>)}
                    </div>
                }

            </div>
        </div>
    );
}

