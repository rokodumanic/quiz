import { useEffect, useState } from "react";

function BrojacPitanja({redniBr, ukupanBr, rez}){

    const [rezultat, setRezultat] = useState(0);

    useEffect(()=>{
        calcRezultat();
    }, [rez]);

    function calcRezultat(){
        let sum = 0;
        for (let i = 0; i < rez.length; i++) {
        if (typeof rez[i] === 'number') { 
        sum += rez[i];
    }
    console.log("sum", sum)
  }
    setRezultat(sum);
    }

    return(
        <div>
            <div className="brojac">
                <h3>Question:</h3>
                <h2> {redniBr}/{ukupanBr}</h2>
            </div>
            <div className="brojac">
                <h3>Rezultat:</h3>
                <h2>{rezultat}</h2>
            </div>
        </div>
    );
}

export default BrojacPitanja;