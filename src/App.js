import './App.css';
import { useState, useEffect } from 'react';
import Pitanje from './components/Pitanje';
import axios from 'axios';
import Odgovori from './components/Odgovori';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import BrojacPitanja from './components/BrojacPitanja';
import Kraj from './components/Kraj';



function App() {
  const [currentPitanje, setCurrentPitanje] = useState(0);
  const [numPitanja, setNumPitanja] = useState(0);
  const [rezultat, setRezultat] = useState([]);
  const [kraj, setKraj] = useState(false);
  const [pitanja, setPitanja] = useState([/* {
    category:"",
    id: null,
    type: "",
    difficulty: "",
    question:"",
    correct_answer:"",
    incorrect_answers: []
} */]);

useEffect(()=>{
    
    restart();
  },[]);

async function getPitanje(){
      let arr = [];
        
            await axios.get('https://opentdb.com/api.php?amount=5&type=multiple').then(
              (response) => {
                console.log("1response", response);
                if (response.data.results && response.data.results.length > 0) {
                  
                  response.data.results.map((eachResponse, i)=>{
                    console.log("each Response", eachResponse);
                    const fetchedQuestion = eachResponse;
                    console.log("fetched question",fetchedQuestion);
                    arr.push({
                      category: fetchedQuestion.category,
                      id: fetchedQuestion.id,
                      type: fetchedQuestion.type,
                      difficulty: fetchedQuestion.difficulty,
                      question: fetchedQuestion.question,
                      correct_answer: fetchedQuestion.correct_answer,
                      incorrect_answers: fetchedQuestion.incorrect_answers
                  }) 
                  
                  })
                  console.log("response", response);
                  console.log("ARR", arr);
                  setPitanja([...arr]);
                    setNumPitanja(arr.length);
                    console.log("pitanja",pitanja, pitanja.length, numPitanja);
              }
        }).catch((err)=>{
          console.log(err);
             if (err.response && err.response.status === 429) {
                const retryAfter = err.response.headers['retry-after'];
                const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : 5000; // Default delay of 5 seconds

                setTimeout(() => {
                    getPitanje(); // Retry after delay
                }, delay);
            } else {
                console.log('Error fetching question. Please try again later.');
            } 
        })
            
    }

  function addResult(prop){
    setRezultat((prevRezultati) => [ ...prevRezultati, prop]);
    if(rezultat.length === pitanja.length-1){
      setKraj(true);
    }
  }

  function handleNext(props){
    setCurrentPitanje(props+1);
    console.log("handleNext pitanje", props+1, currentPitanje, numPitanja	);
    if(props == numPitanja){
      console.log("handleNext", props, numPitanja);
      return(<p>Presli ste</p>);
    }
  }

  function restart(){
    setPitanja([]);
    setCurrentPitanje(0);
    setRezultat([]);
    setKraj(false);
      getPitanje();
  }

  return (
    <div className="App">
    {kraj && <Kraj restart={restart} rezultat={rezultat}/> }
      {pitanja.length && pitanja.map((eachPitanje, i)=>{
        if (currentPitanje === i)
        {return(
          <div className='quizContainer'>
          <div className="qaContainer">
          <Pitanje 
            pitanje={eachPitanje.question}
            redniBr={i+1}
          />
  
          <Odgovori
              tocniOdg={eachPitanje.correct_answer}
              neTocniOdg={eachPitanje.incorrect_answers}
              addResult={addResult}
          />
          

          

        { rezultat.length===i+1 ? <Button onClick={()=>handleNext(currentPitanje)} disabled={currentPitanje === numPitanja - 1}>next</Button> : null}
          </div>
          <div>

        <BrojacPitanja
            redniBr={i+1}
            ukupanBr={pitanja.length}
            rez={rezultat}
          />

        </div>
        </div>
        )}
      }) }
    </div>
  );
}

export default App;
