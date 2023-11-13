import RadioWithInput from './RadioWithInput';

const AnswerGroup = ({ questionNumber, onChange, selectedOptions, setSelectedOptions, onCorrectAnswerChange}) => {
  const handleRadioChange = (inputNumber, value) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[questionNumber - 1] = value; 
      return newSelectedOptions;
    });
    onCorrectAnswerChange(inputNumber, value);
  };

  const handleInputChange = (inputNumber, value) => {
    onChange(inputNumber, value);
  };

  const groupName = `question${questionNumber}`;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
      <RadioWithInput
        radioValue={`option1-${questionNumber}`}
        onRadioChange={() => handleRadioChange(0, "option1")} 
        onInputChange={(e) => handleInputChange(0, e.target.value)}
        selectedOption={selectedOptions[questionNumber - 1] === "option1"}
        groupName={groupName}
      />

      <RadioWithInput
        radioValue={`option2-${questionNumber}`}
        onRadioChange={() => handleRadioChange(1, "option2")}
        onInputChange={(e) => handleInputChange(1, e.target.value)}
        selectedOption={selectedOptions[questionNumber - 1] === "option2"}
        groupName={groupName}
      />

      <RadioWithInput
        radioValue={`option3-${questionNumber}`}
        onRadioChange={() => handleRadioChange(2, "option3")}
        onInputChange={(e) => handleInputChange(2, e.target.value)}
        selectedOption={selectedOptions[questionNumber - 1] === "option3"}
        groupName={groupName}
      />

      <RadioWithInput
        radioValue={`option4-${questionNumber}`}
        onRadioChange={() => handleRadioChange(3, "option4")}
        onInputChange={(e) => handleInputChange(3, e.target.value)}
        selectedOption={selectedOptions[questionNumber - 1] === "option4"}
        groupName={groupName}
      />
    </div>
  );
};

export default AnswerGroup;