import React, { useState } from 'react';
import axios from 'axios';

type Props = {};

const Calculator: React.FC<Props> = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState<'addition' | 'subtraction' | 'multiplication'>('addition');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleCalculate = async () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (!isNaN(number1) && !isNaN(number2)) {
      const data = {
        FirstNo: number1,
        SecondNo: number2,
        Operation: operator,
      };

      try {
        setLoading(true); // Set loading to true before making the API call
        const response = await axios.post('https://rohan-nordstone.vercel.app/api/ans', data);

        if (response.status === 200 || response.status === 201) {
          setResult(response.data.result);
          console.log(response.data.result);
        } else {
          console.error('Error calculating:', response);
        }
      } catch (error) {
        console.error('Error calculating:', error);
      } finally {
        setLoading(false); // Set loading to false after the API call is completed
      }
    } else {
      console.error('Invalid numbers.');
    }
  };
  const handleReset = () => {
    setNum1('');
    setNum2('');
    setOperator('addition');
    setResult(null);
  };
  return (
    <div className='calculator-container'>
      <h2>Calculator</h2>
      <div>
        <label htmlFor="num1">Number 1:</label>
        <input
          type="number"
          id="num1"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="num2">Number 2:</label>
        <input
          type="number"
          id="num2"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="operator">Choose an operator:</label>
        <select
          id="operator"
          value={operator}
          onChange={(e) => setOperator(e.target.value as 'addition' | 'subtraction' | 'multiplication')}
        >
          <option value="addition">Addition (+)</option>
          <option value="subtraction">Subtraction (-)</option>
          <option value="multiplication">Multiplication (x)</option>
        </select>
      </div>
      <div className="btns">
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleCalculate}>Calculate</button>
      </div>
      {loading && <p>Loading...</p>}
      {result !== null && !loading && <p>Result: {result}</p>}
    </div>
  );
};

export default Calculator;
