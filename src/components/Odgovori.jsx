import React, { useEffect, useState } from 'react';
import {Button} from "react-bootstrap";

const Odgovori = ({ tocniOdg, neTocniOdg, addResult }) => {
    const [arrButton, setArrButton] = useState([]);
    const [tocanIndex, setTocanIndex] = useState(-1);
    const [clicked, setClicked] = useState(-1);

    useEffect(()=>{
        let arrOdg = [];
        neTocniOdg.map((eachOdg, i)=>{
            const odg = new DOMParser().parseFromString(eachOdg, 'text/html');
            console.log(" AAAAAAAAAAAAA###",eachOdg, odg.documentElement.textContent);
            arrOdg.push(odg.documentElement.textContent);
        })
        const arr = [tocniOdg, ...arrOdg];
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

    function handleButtonClick(index, isCorrect){
        setClicked(index);
        if(isCorrect){
            addResult(1);
        } else addResult(0);
    };

    function handleDisabledButton(){
        if(clicked===-1){
            return false;
        }else {return true;}
    }

    return (
        <>
            <p>Click the correct answer:</p>
            <>
                {arrButton.map((odg, i) => {
                    const isCorrect = i === tocanIndex;

                    return (
                        <Button variant="light"
                            className='botunZaOdgovor'
                            key={i}
                            onClick={() => handleButtonClick(i, isCorrect)}
                            style={{
                                backgroundColor: clicked!=-1 ? (isCorrect ? 'green' : clicked === i ? 'red' : 'white') : 'white'
                                
                                
                            }}
                            disabled={handleDisabledButton()}
                            >{odg}</Button>
                    );
                })}
            </>
        </>
    );
};

export default Odgovori;
