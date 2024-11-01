import '../css/general.css'
import { Result } from 'antd';

export default function VoteAccepted() {
    return (
        <div className='content center'>
            <div className='card spaced-column center'>

                <Result
                    status="success"
                    title="Success"
                    subTitle="Your vote has been accepted!"
                />
                   
            </div>
        </div>
    )
}
