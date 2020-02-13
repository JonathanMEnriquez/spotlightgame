import React, { useState } from 'react';
import './SingleRecord.css';

const SingleRecord = (props) => {
    const [displayGuesses, setDisplayGuesses] = useState(false);
    const { record, key } = props;
    const guessesKeys = Object.keys(record.guesses);

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
            <td colSpan={4}>
                {guessesKeys.map((k, i) => {
                    return (
                    <span className="guess" key={i}>{`${k}: ${record.guesses[k]}${i === guessesKeys.length - 1 ? '' : ', '}`}</span>
                    )
                })}
            </td>
        </tr>
    </tbody>
    )
}

export default SingleRecord;