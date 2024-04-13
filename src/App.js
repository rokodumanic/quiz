import './App.css';
import Pitanje from './components/Pitanje';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Odgovori from './components/Odgovori';



function App() {
  const [currentPitanje, setCurrentPitanje] = useState(0);
  const [numPitanja, setNumPitanja] = useState(0);
  const [pitanja, setPitanja] = useState([{
    category:"",
    id: null,
    type: "",
    difficulty: "",
    question:"",
    correct_answer:"",
    incorrect_answers: []
}]);

useEffect(()=>{
    const getPitanje = async () => {
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
    getPitanje();
  },[]);

  function handleNext(props){
    setCurrentPitanje(props+1);
    if(props === numPitanja){
      return(<p>Presli ste</p>);
    }
  }

  function handlePrev(props){
    setCurrentPitanje(props-1);

  }

  return (
    <div className="App">
      {pitanja.length && pitanja.map((eachPitanje, i)=>{
        if (currentPitanje === i)
        {return(
          <div className="qaContainer">
          <h3>Question:{i+1}/{pitanja.length}</h3>
          <h2>{eachPitanje.question}</h2>  
          <Odgovori
              tocniOdg={eachPitanje.correct_answer}
              neTocniOdg={eachPitanje.incorrect_answers}
          />
        </div>)}
      }) }
      <button onClick={()=>handleNext(currentPitanje)}>next</button>

    </div>
  );
}

export default App;
