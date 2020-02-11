import React, { useState } from 'react';
import './SingleRecord.css';

const SingleRecord = (props) => {
    const [displayGuesses, setDisplayGuesses] = useState(false);
    const { record, key } = props;

    const toggleGuessDisplay = () => {
        setDisplayGuesses(displayGuesses => !displayGuesses);
    }

    return (
    <tbody className="entry">
    <tr key={key} className="record" onClick={toggleGuessDisplay}>
        <td>{record.date}</td>
        <td>{record.location}</td>
        <td>{record.winner}</td>
        <td><a target="_blank" rel="noopener noreferrer" href={record.imgSrc}>Link</a></td>
    </tr>
    <tr className={displayGuesses ? 'guesses' : 'hidden'}>
    <div>
        {Object.keys(record.guesses).map((k, i) => {
            return (
            <span key={i}>{`${k}: ${record.guesses[k]}`}</span>
            )
        })}
    </div>
    </tr>
    </tbody>
    )
}

export default SingleRecord;