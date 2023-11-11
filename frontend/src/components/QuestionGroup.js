import AnswerGroup from './AnswerGroup';
import { Input } from "@nextui-org/react";

const QuestionGroup = ({ questionNumber }) => {
    return(
        <div style={{paddingTop: '0px'}}>
            <Input
            size="lg"
            key={`Question-${questionNumber}`}
            type="string"
            color='danger'
            label={`Question ${questionNumber}`}
            placeholder=""
            labelPlacement="outside"
            fullWidth
            />
            <div style={{ marginBottom: '10px',}}/> 
            <AnswerGroup />
        </div>
    );
};

export default QuestionGroup;
