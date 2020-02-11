import React from 'react';
import './History.css';
import Close from './img/cross.png';
import SingleRecord from './SingleRecord';

const History = (props) => {
    const { history, shouldDisplay, hideHistory } = props;
    return (
    <div className={shouldDisplay ? 'history' : 'hidden'}>
        <img className="close" src={Close} alt="x" onClick={hideHistory} />
        <h3>Previous Results</h3>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Winner</th>
                    <th>Source</th>
                </tr>
            </thead>
            {/* <tbody> */}
            {history && history.map((en, i) => {
            return (
                <SingleRecord key={i} record={en} />
            )
            })}
            {/* </tbody> */}
        </table>
    </div>
    )
}

export default History;