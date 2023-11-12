import React from 'react';
import {Input}  from "@nextui-org/react";

const RadioWithInput = ({ label, radioValue, inputValue, onRadioChange, onInputChange, selectedOption, groupName}) => {
  const handleRadioChange = () => {
    onRadioChange(radioValue);
  };
    // console.log(radioValue + " " + selectedOption + groupName);
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <label style={{ marginRight: '10px' }}>
        <input
          type="radio"
          name={groupName}
          value={radioValue}
          checked={selectedOption}
          // radioValue ===
          onChange={handleRadioChange}
        />
        {/* i dont know what this is  */}
        {label} 
      </label>

      <Input
        size="sm"
        key='actualQuestion'
        color='danger'
        label="answer"
        placeholder=" "
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