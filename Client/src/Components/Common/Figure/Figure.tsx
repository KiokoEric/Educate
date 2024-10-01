import React from 'react';
import { Link } from 'react-router-dom';

interface NavigateProps {
    onClick?:any
    children?: any;
    Navigation?: any;
    NavigateText?: string;
}

const Figure: React.FC<NavigateProps> = ({ Navigation, children, NavigateText, onClick }) => {
return (
    <Link to={Navigation} className='cursor-pointer' onClick={onClick}>
        { children }
        <figcaption className='text-center'>
            <p className='font-bold text-xl'>{NavigateText}</p>
        </figcaption>
    </Link>
)
}

export default React.memo(Figure)
