import React from 'react';

interface ResultProps {
    image: string;
    Title: string;
    Text? : string;
    TextStyle: string;
    imageStyle: string;
    TitleStyle: string;
    figureStyle: string;
}

const Output: React.FC<ResultProps> = ({ figureStyle, image, imageStyle, TitleStyle, Title, Text, TextStyle }) => {
return (
    <figure className={figureStyle} >
        <img src={image} alt="" className={imageStyle} /> 
        <figcaption>
            <h2 className={TitleStyle}>{Title}</h2>
            <p className={TextStyle}>{Text}</p>
        </figcaption>
    </figure>
)
}

export default React.memo(Output)
