import React, { useState } from 'react';
import Header from '../components/Header';
import { evaluate } from 'mathjs';  
import '../css/Calculator.css'

function Calculator() {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput(input + value);
  };

  const calculateResult = () => {
    try {
      const result = evaluate(input);  
      setInput(result.toString());
    } catch (err) {
      setInput('Error');
    }
  };

  const clearInput = () => {
    setInput('');
  };

  return (
    <div>
      <Header />
      <div className="calculator-container">
        <h1 className="calculator-title">Calculator</h1>
        <input className="calculator-input" type="text" value={input} readOnly />
        <div className="calculator-buttons">
          <button className="calculator-button" onClick={() => handleClick('1')}>1</button>
          <button className="calculator-button" onClick={() => handleClick('2')}>2</button>
          <button className="calculator-button" onClick={() => handleClick('3')}>3</button>
          <button className="calculator-button operator" onClick={() => handleClick('+')}>+</button>
          <button className="calculator-button" onClick={() => handleClick('4')}>4</button>
          <button className="calculator-button" onClick={() => handleClick('5')}>5</button>
          <button className="calculator-button" onClick={() => handleClick('6')}>6</button>
          <button className="calculator-button operator" onClick={() => handleClick('-')}>-</button>
          <button className="calculator-button" onClick={() => handleClick('7')}>7</button>
          <button className="calculator-button" onClick={() => handleClick('8')}>8</button>
          <button className="calculator-button" onClick={() => handleClick('9')}>9</button>
          <button className="calculator-button operator" onClick={() => handleClick('*')}>*</button>
          <button className="calculator-button clear" onClick={clearInput}>C</button>
          <button className="calculator-button" onClick={() => handleClick('0')}>0</button>
          <button className="calculator-button equal" onClick={calculateResult}>=</button>
          <button className="calculator-button operator" onClick={() => handleClick('/')}>/</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
