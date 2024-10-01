import React from 'react';

interface ButtonProps {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    id?: string;
    Children?: any;
    ButtonText: any;
    ButtonStyle: string;
}

const Button: React.FC<ButtonProps> = ({id, Children, ButtonText, ButtonStyle, onClick }) => {
return (
    <div id={id} onClick={onClick} className={ButtonStyle}>{Children} <p>{ ButtonText }</p></div>
)
}

export default React.memo(Button);
