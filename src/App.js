import React from 'react';
import './App.scss';
import Theme from './components/Theme';
import Title from './components/Title';
import Screen from './components/Screen';
import Keyboard from './components/Keyboard';

function App() {
  const operators = ['+', '-', '/', '*'];
  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
  const reset = 'reset';
  const equal = '=';
  const del = 'del';
  const themes = [
    {
      id: 1,
      name: 'theme-default',
    },
    {
      id: 2,
      name: 'theme-secondary',
    },
    {
      id: 3,
      name: 'theme-terciary',
    }
  ]

  const [firstNumber, setFirstNumber] = React.useState(null);
  const [screenText, setScreenText] = React.useState('0');
  const [operator, setOperator] = React.useState(null);
  const [keyPressed, setKeyPressed] = React.useState(null);

  const [newNumber, setNewNumber] = React.useState(true);
  const [infinityError, setInfinityError] = React.useState(false);

  const [themeSelected, setThemeSelected] = React.useState(1);
  
  React.useEffect( () => {
    console.log('test')
    validateKeyType(keyPressed)
  }, [keyPressed])

  React.useEffect( () => {
    if(screenText === '') {
      setNewNumber(true)
      numberPressed ('0')
    }
  }, [screenText])

  React.useEffect( () => {
    if(screenText === 'NaN' || screenText === 'Infinity' ) {
      setInfinityError(true);
      disableInfinityError();
      setKeyPressed(reset);
    }
  }, [screenText])
  

  function validateKeyType (keyPressed) {
    if(keyPressed === null) {
      return
    }
    
    if (numbers.includes(keyPressed)) {
      numberPressed(keyPressed);
    }

    if (operators.includes(keyPressed)) {
      operatorPressed (keyPressed)
    }

    if(keyPressed === del && !newNumber){
      setScreenText( screenText.slice(0, -1) )
      setNewNumber(false)
    }

    if(keyPressed === reset){
      setFirstNumber(null);
      setScreenText('0')
      setOperator(null);
      setNewNumber(true);
    }

    if(keyPressed === equal) {
      setNewNumber(true); 
      calculate();
    }

    setKeyPressed(null)
  }

  function numberPressed (keyPressed) {
    if (newNumber) {
      setScreenText( keyPressed )
      setNewNumber(false)
    } else {
      setScreenText( screenText => screenText + keyPressed )
    }
  }

  function operatorPressed (keyPressed) {
    setOperator(keyPressed);
    setNewNumber(true);
    setFirstNumber(screenText);
    calculate();
  }

  function calculate () {
    if( !newNumber && firstNumber && screenText) {      
      const floatNum1 = parseFloat(firstNumber);
      const floatNum2 = parseFloat(screenText);
      let result;
  
      switch(operator) {
        case '+':
          result = String( floatNum1 + floatNum2);
          break;
        case '-':
          result = String( floatNum1 - floatNum2);
          break;
        case '/':
          result = String( floatNum1 / floatNum2);
          break;
        case '*':
          result = String( floatNum1 * floatNum2);
          break;
      }
  
      setScreenText(result);
      setFirstNumber(result);
    }
  }

  function disableInfinityError() {
    setTimeout( () =>{
      setInfinityError(false)
    }, 2000)
  }

  return (
    <>
      <main className={`theme-${themeSelected}`}>
        <section className="container">
          <header className="header">
            <Title text='Calc' />
            <Theme themes={themes} themeSelected={themeSelected} setThemeSelected={setThemeSelected} />
          </header>
          { infinityError && <div className="infinity-warning"> Não é possível dividir por 0! </div> }
          <Screen screenText={screenText} setScreenText={setScreenText} />
          <Keyboard setKeyPressed={setKeyPressed} />
        </section>
      </main>
    </>
  );
}

export default App;
