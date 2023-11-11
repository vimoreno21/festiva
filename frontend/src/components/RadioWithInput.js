import React from 'react';
import {input, Input}  from "@nextui-org/react";

const RadioWithInput = ({ label, radioValue, inputValue, onRadioChange, onInputChange, selectedOption}) => {
  const handleRadioChange = () => {
    onRadioChange(radioValue);
  };
    console.log(radioValue + inputValue);
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <label style={{ marginRight: '10px' }}>
        <input
          type="radio"
          name="options"
          value={radioValue}
          checked={radioValue === selectedOption}
          onChange={handleRadioChange}
        />
        {label}
      </label>

      <Input
        size="sm"
        key='actualQuestion'
        color='danger'
        label="answer"
        placeholder=""
        labelPlacement="outside"
        fullWidth
        type="text"
        value={inputValue}
        onChange={onInputChange}
        style={{ padding: '8px' }}
      />
    </div>
  );
};

export default RadioWithInput;