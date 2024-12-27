import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button"

function Kraj({restart, rezultat}){

    const [rez, setRezultat] = useState(0);
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



    useEffect(()=>{
        handleShow();
        calcRezultat();
    },[])

    function calcRezultat(){
        let sum = 0;
        for (let i = 0; i < rezultat.length; i++) {
        if (typeof rezultat[i] === 'number') { 
        sum += rezultat[i];
    }
    console.log("sum", sum)
  }
    setRezultat(sum);
    }

    return(
        <Modal show={show}>
            <Modal.Header closeButton>
          <Modal.Title>The End</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you have {rez}/{rezultat.length} points!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{restart(); handleClose();}}>
            Restart
          </Button>
        </Modal.Footer>
        </Modal>
    );
}

export default Kraj;