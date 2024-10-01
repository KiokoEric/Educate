import React, { createContext, useContext, useState, ReactNode, useEffect  } from 'react';

interface AppContextProps {
    Category: any;
    setCategory: (Category: any) => void;
    Difficulty: any;
    setDifficulty: (Difficulty: any) => void;
    Type: any;
    setType: (Type: any) => void;
}

const AppContext = createContext<AppContextProps| undefined>(undefined);


export const useAppContext = () => {
    const context = useContext(AppContext)

    if (context === undefined) {
        throw new Error('App context must be within App context provider. ')
    }
    return context
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({children})  => {

    const [Category, setCategory] = useState<string>(()=> {
        const savedCategory = localStorage.getItem("Category")
        return savedCategory ? JSON.parse(savedCategory) : '';
    })
    const [Difficulty, setDifficulty] = useState<string>(()=> {
        const savedDifficulty = localStorage.getItem("Difficulty")
        return savedDifficulty ? JSON.parse(savedDifficulty) : '';
    })
    const [Type, setType] = useState<string>(()=> {
        const savedType = localStorage.getItem("Type")
        return savedType ? JSON.parse(savedType) : '';
    })
    
    useEffect(() => {
        localStorage.setItem("Category", JSON.stringify(Category))
    },[Category]);

    useEffect(() => {
        localStorage.setItem("Difficulty", JSON.stringify(Difficulty))
    },[Difficulty]);

    useEffect(() => {
        localStorage.setItem("Type", JSON.stringify(Type))
    },[Type]);

    return (
    <AppContext.Provider value={{ Category, setCategory, Difficulty, setDifficulty, Type, setType}}>
        {children}
    </AppContext.Provider>
    );
};
