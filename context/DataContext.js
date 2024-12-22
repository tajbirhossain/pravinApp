// DataContext.js
import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [apiData, setApiData] = useState(null);

    const storeApiData = (data) => {
        setApiData(data);
    };

    return (
        <DataContext.Provider value={{ apiData, storeApiData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
