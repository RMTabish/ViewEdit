import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface DataContextType {
  data: any[] | null;
  setData: (data: any[]) => void;
}

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Context provider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any[] | null>(null);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

// Hook to use the context
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
