import React from "react";

function Button ({keyValue, setKeyPressed}) {
  const convertKeyToASCII = keyValue.charCodeAt(0);

  function keyPressed (event) {
    setKeyPressed(event.currentTarget.innerHTML)
  }
  
  return (
    <>
      <button 
        onClick={keyPressed} 
        className={`button ${keyValue} key-${convertKeyToASCII}`}
      >
      {keyValue}
      </button>
    </>
  );
}

export default Button;
