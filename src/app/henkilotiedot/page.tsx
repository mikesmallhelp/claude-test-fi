"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';
import NavigationButtons from '@/components/NavigationButtons';
import { useFormContext } from '@/lib/FormContext';
import { validoiHenkilotiedot } from '@/lib/validointi';
import { Henkilotiedot } from '@/lib/types';

export default function HenkilotiedotPage() {
  const router = useRouter();
  const { lomakedata, setHenkilotiedot } = useFormContext();
  
  const [henkilotiedot, setHenkilotiedotState] = useState<Henkilotiedot>(lomakedata.henkilotiedot);
  const [virheet, setVirheet] = useState<Record<string, string>>({});
  const [koskettu, setKoskettu] = useState<Record<string, boolean>>({});
  const [validi, setValidi] = useState(false);
  
  useEffect(() => {
    const validointiTulos = validoiHenkilotiedot(henkilotiedot);
    setValidi(validointiTulos.validi);
    
    // Näytä virheet vain kosketuille kentille
    const naytettavatVirheet: Record<string, string> = {};
    Object.keys(validointiTulos.virheet).forEach(kentta => {
      if (koskettu[kentta]) {
        naytettavatVirheet[kentta] = validointiTulos.virheet[kentta];
      }
    });
    
    setVirheet(naytettavatVirheet);
  }, [henkilotiedot, koskettu]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setHenkilotiedotState(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setKoskettu(prev => ({
      ...prev,
      [id]: true
    }));
  };
  
  const seuraavaSivu = () => {
    // Tallenna tiedot context:iin ennen seuraavalle sivulle siirtymistä
    setHenkilotiedot(henkilotiedot);
    router.push('/osoitetiedot');
  };
  
  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Henkilötiedot</h2>
          
          <InputField 
            id="etunimi"
            label="Etunimi"
            value={henkilotiedot.etunimi}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.etunimi}
            required
          />
          
          <InputField 
            id="sukunimi"
            label="Sukunimi"
            value={henkilotiedot.sukunimi}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.sukunimi}
            required
          />
          
          <InputField 
            id="syntymaaika"
            label="Syntymäaika"
            placeholder="PP.KK.VVVV"
            value={henkilotiedot.syntymaaika}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.syntymaaika}
            required
          />
          
          <InputField 
            id="sahkoposti"
            label="Sähköposti"
            type="email"
            value={henkilotiedot.sahkoposti}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.sahkoposti}
            required
          />
          
          <InputField 
            id="puhelinnumero"
            label="Puhelinnumero"
            value={henkilotiedot.puhelinnumero}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.puhelinnumero}
            required
          />
          
          <NavigationButtons
            backUrl="/"
            onSubmit={validi ? seuraavaSivu : undefined}
            disableNext={!validi}
            submitLabel="Seuraava"
          />
        </div>
      </section>
    </main>
  );
}