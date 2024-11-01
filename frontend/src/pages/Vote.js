import '../css/general.css'
import '../css/Vote.css'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Radio, Button } from 'antd';
import { getItsmeName } from '../itsme/itsme';
import { vote } from '../requests/requests';

export default function Vote() {

    let { token } = useParams();

    const navigate = useNavigate();

    const [selected, setSelected] = useState(undefined)
    const [submitLoading, setSubmitLoading] = useState(false)

    /* LOGIC */
    const handleSelect = e => {
        setSelected(e.target.value)
    };

    const handleSubmit = () => {
        if (selected !== undefined) {
            setSubmitLoading(true)
            vote(selected, token, (result) => {
                setSubmitLoading(false)
                if (result) {
                    navigate('/vote-accepted')
                } else {
                    navigate('/error') /* should never happen */
                }
            }, () => {navigate('/error')})
        }
    };

    const [candidateList, setCandidateList] = useState(undefined)
    useEffect(() => {
        let ignore = false;

        const url = `http://127.0.0.1:8000/candidates`
        const http = new XMLHttpRequest()
        http.open("GET", url)
        http.send()

        http.onreadystatechange = function() {
            // readyState 4 means the request is done
            if (this.readyState === 4 && this.status === 200) {
                setCandidateList(JSON.parse(http.responseText))
            }
        }
        
        return () => {
            ignore = true;
        }
    }, [])

    /* HTML */
    return (
        <div className='content center'>
            <div className='card spaced-column center'>

                <div
                    >Welcome {getItsmeName(token)}
                </div>

                {candidateList === undefined
                    ? <div className='loading'>Loading...</div>
                    : <div className='vote-form row'>
                        <div className='form-element column'>

                            <Radio.Group className='candidates-list'
                                onChange={handleSelect} 
                                value={selected}
                            >
                                {candidateList.map(c => 
                                    <Radio value={c.name}>{c.name}</Radio>
                                )}
                            </Radio.Group>

                        </div>
                        <div className='form-element at-end'>

                            {selected === undefined
                                ? <div className='loading'>please select a candidate...</div>
                                : <div>{selected}</div>
                            }

                            <div className='submit-button-wrapper'>
                                <Button className='submit-button'
                                    type="primary" 
                                    onClick={handleSubmit}
                                    disabled={selected === undefined}
                                    loading={submitLoading}
                                >
                                    Submit
                                </Button>
                            </div>

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
