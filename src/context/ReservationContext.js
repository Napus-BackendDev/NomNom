import React, { createContext, useState, useContext } from 'react';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservation, setReservation] = useState(null);

  const saveReservation = (data) => setReservation(data);
  const clearReservation = () => setReservation(null);

  return (
    <ReservationContext.Provider value={{ reservation, saveReservation, clearReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) throw new Error('useReservation must be used within a ReservationProvider');
  return context;
}; 