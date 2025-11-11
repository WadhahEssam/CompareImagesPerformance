import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PerformanceContextType {
  startTime: number;
  setStartTime: (time: number) => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const PerformanceProvider = ({ children }: { children: ReactNode }) => {
  const [startTime, setStartTime] = useState<number>(0);

  return (
    <PerformanceContext.Provider value={{ startTime, setStartTime }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within PerformanceProvider');
  }
  return context;
};

