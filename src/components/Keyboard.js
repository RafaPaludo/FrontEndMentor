import React from 'react';
import Button from "./Button";


const calculatorKeys = ['7', '8', '9', 'del', '4', '5', '6', '+', '1', '2', '3', '-', '.', '0', '/', '*', 'reset', '='];

function Keyboard ({setKeyPressed}) {
  return (
    <>
      <div className="keyboard">
        { calculatorKeys.map( (key) => <Button keyValue={key} key={key} setKeyPressed={setKeyPressed} /> ) }
      </div>
    </>
  );
}

export default Keyboard;
