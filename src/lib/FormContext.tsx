"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Henkilotiedot, Osoitetiedot, Luottokorttitiedot, Lomakedata } from './types';

interface FormContextType {
  lomakedata: Lomakedata;
  setHenkilotiedot: (tiedot: Henkilotiedot) => void;
  setOsoitetiedot: (tiedot: Osoitetiedot) => void;
  setLuottokorttitiedot: (tiedot: Luottokorttitiedot) => void;
}

const defaultHenkilotiedot: Henkilotiedot = {
  etunimi: '',
  sukunimi: '',
  syntymaaika: '',
  sahkoposti: '',
  puhelinnumero: ''
};

const defaultOsoitetiedot: Osoitetiedot = {
  katuosoite: '',
  postinumero: '',
  paikkakunta: '',
  maa: ''
};

const defaultLuottokorttitiedot: Luottokorttitiedot = {
  nimikortissa: '',
  kortinnumero: '',
  voimassaolo: '',
  cvv: '',
  korttityyppi: ''
};

const defaultLomakedata: Lomakedata = {
  henkilotiedot: defaultHenkilotiedot,
  osoitetiedot: defaultOsoitetiedot,
  luottokorttitiedot: defaultLuottokorttitiedot
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [lomakedata, setLomakedata] = useState<Lomakedata>(defaultLomakedata);
  
  const setHenkilotiedot = (tiedot: Henkilotiedot) => {
    setLomakedata(prevData => ({
      ...prevData,
      henkilotiedot: tiedot
    }));
  };
  
  const setOsoitetiedot = (tiedot: Osoitetiedot) => {
    setLomakedata(prevData => ({
      ...prevData,
      osoitetiedot: tiedot
    }));
  };
  
  const setLuottokorttitiedot = (tiedot: Luottokorttitiedot) => {
    setLomakedata(prevData => ({
      ...prevData,
      luottokorttitiedot: tiedot
    }));
  };
  
  return (
    <FormContext.Provider value={{ lomakedata, setHenkilotiedot, setOsoitetiedot, setLuottokorttitiedot }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}