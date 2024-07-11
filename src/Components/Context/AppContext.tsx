import React, { createContext, useContext, useState, ReactNode  } from 'react';

interface AppContextProps {
    Category: string;
    setCategory: (Category: string) => void;
    Difficulty: string;
    setDifficulty: (Difficulty: string) => void;
    Type: string;
    setType: (Type: string) => void;
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
    const [Category, setCategory] = useState<string>('')
    const [Difficulty, setDifficulty] = useState<string>('')
    const [Type, setType] = useState<string>('')


    return (
    <AppContext.Provider value={{ Category, setCategory, Difficulty, setDifficulty, Type, setType}}>
        {children}
    </AppContext.Provider>
    );
};

// export const useContext = (): AppContextProps => {
//     const context = useContext(AppContext);
//     if (!context) {
//     throw new Error('Data must be used within the AppProvider');
//     }
//     return context;
// };