import React from 'react';
import { FaCircle } from "react-icons/fa";

interface AnswerProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    id?: string;
    key?: any;
    disabled?: any
    AnswerText: any;
    AnswerStyle: any;
    TextStyle?: string;
}

const Answer: React.FC<AnswerProps> = ({ key, AnswerText, AnswerStyle, TextStyle, disabled, onClick }) => {
return (
    <button key={key} className={AnswerStyle} onClick={onClick} aria-disabled={disabled}>
        <FaCircle size="0.8rem" />
        <p className={TextStyle}>{AnswerText}</p>
    </button>
    
)
}

export default React.memo(Answer);
