import React, { useState } from 'react';
import RadioWithInput from './RadioWithInput'; // Adjust the path accordingly

const YourForm = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');

  const handleRadioChange = (value) => {
    console.log("clicked " + value);
    setSelectedOption(value);
  };

  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };

  const handleInputChange3 = (e) => {
    setInputValue3(e.target.value);
  };

  const handleInputChange4 = (e) => {
    setInputValue4(e.target.value);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
      <RadioWithInput
        radioValue="option1"
        inputValue={inputValue1}
        onRadioChange={() => handleRadioChange('option1')}
        onInputChange={handleInputChange1}
        selectedOption={selectedOption}
      />

      <RadioWithInput
        radioValue="option2"
        inputValue={inputValue2}
        onRadioChange={() => handleRadioChange('option2')}
        onInputChange={handleInputChange2}
        selectedOption={selectedOption}
      />

      <RadioWithInput
        radioValue="option3"
        inputValue={inputValue3}
        onRadioChange={() => handleRadioChange('option3')}
        onInputChange={handleInputChange3}
        selectedOption={selectedOption}
      />

      <RadioWithInput
        radioValue="option4"
        inputValue={inputValue4}
        onRadioChange={() => handleRadioChange('option4')}
        onInputChange={handleInputChange4}
        selectedOption={selectedOption}
      />
    </div>
  );
};

export default YourForm;