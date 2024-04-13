import React, { useEffect, useState } from 'react';

const Odgovori = ({ tocniOdg, neTocniOdg }) => {
    const [arrButton, setArrButton] = useState([]);
    const [tocanIndex, setTocanIndex] = useState(-1);
    const [clicked, setClicked] = useState(-1);

    useEffect(()=>{
        const arr = [tocniOdg, ...neTocniOdg];
        const shuffleArr = shuffle(arr);
        setArrButton(shuffleArr);
        setTocanIndex(shuffleArr.findIndex(element=>element===tocniOdg));
    }, [tocniOdg, neTocniOdg])

    function shuffle(arr) {
        const shuffledArr = [...arr];
        for (let i = 0; i < shuffledArr.length - 1; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
        }
        return shuffledArr;
    }

    const handleButtonClick = (index) => {
        setClicked(index);
    };

    return (
        <>
            <p>Click the correct answer:</p>
            <>
                {arrButton.map((odg, i) => {
                    const isCorrect = i === tocanIndex;

                    return (
                        <button
                            className='botunZaOdgovor'
                            key={i}
                            onClick={() => handleButtonClick(i)}
                            style={{
                                backgroundColor: clicked === i ? (isCorrect ? 'green' : 'red') : 'white'
                            }}
                        >
                            {odg}
                        </button>
                        
                    );
                })}
            </>
        </>
    );
};

export default Odgovori;
