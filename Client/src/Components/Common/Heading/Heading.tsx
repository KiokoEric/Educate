import React from 'react';

interface HeadingProps {
    idName: string;
    Heading: string;
    FirstText?: string;
    SecondText?: string;
    FirstStyle?: string;
    HeadingStyle: string;
    SecondStyle?: string;
    ContainerStyle: string;
}

const Heading: React.FC<HeadingProps> = ({ idName, ContainerStyle, Heading, HeadingStyle, FirstStyle, FirstText, SecondStyle, SecondText }) => {

return (
    <div id={idName} className={ContainerStyle} >
        <h1 className={HeadingStyle}>{Heading}</h1>
        <h2 className={FirstStyle}>{FirstText}</h2>
        <h3 className={SecondStyle}>{SecondText}</h3>
    </div>
)
}

export default React.memo(Heading);
