import React, { useState } from 'react';
import './SingleRecord.css';

const SingleRecord = (props) => {
    const [displayGuesses, setDisplayGuesses] = useState(false);
    const { record } = props;
    const guessesKeys = Object.keys(record.guesses);
    const hasValidLink = record.imgSrc.includes('.');
    const href = hasValidLink ? record.imgSrc : '#';
    const linkLabel = hasValidLink ? 'Link' : 'n/a';
    const linkClass = hasValidLink ? '' : 'dead-link';

    const toggleGuessDisplay = () => {
        setDisplayGuesses(displayGuesses => !displayGuesses);
    }

    return (
        <tbody className="entry">
            <tr className="record" onClick={toggleGuessDisplay}>
                <td>{record.date}</td>
                <td>{record.location}</td>
                <td>{record.winner}</td>
                <td>
                    <a className={linkClass} target="_blank" rel="noopener noreferrer" href={href}>{linkLabel}</a>
                </td>
            </tr>
            <tr className={displayGuesses ? 'guesses' : 'hidden'}>
                <td colSpan={4}>
                    {guessesKeys.map((k, i) => {
                        return (
                        <span key={i} className="guess-row">
                            <span className={record.winner === k ? "guesser winner" : "guesser"}>{`${k}: `}</span>
                            <span className={record.winner === k ? "guess winner" : "guess"}>{record.guesses[k]}</span>
                            <span>{`${i === guessesKeys.length - 1 ? '' : ', '}`}</span>
                        </span>
                        )
                    })}
                </td>
            </tr>
        </tbody>
    )
}

export default SingleRecord;