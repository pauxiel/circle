import { createContext, useContext, useState } from "react";

const CreateComContext = createContext({});

export default function CreateProvider({ children }: any) {
  const [state, setState] = useState('choosing');

  return (
    <CreateComContext.Provider value={{ state, setState }}>
      {children}
    </CreateComContext.Provider>
  );
}

export const useCreate = () => {
  const context = useContext(CreateComContext);
  const { state, setState }: any = context;
  return { state, setState };
};