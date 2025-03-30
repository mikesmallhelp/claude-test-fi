"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import NavigationButtons from '@/components/NavigationButtons';
import { useFormContext } from '@/lib/FormContext';
import { validoiOsoitetiedot } from '@/lib/validointi';
import { Osoitetiedot } from '@/lib/types';

const maaVaihtoehdot = [
  { value: 'suomi', label: 'Suomi' },
  { value: 'ruotsi', label: 'Ruotsi' },
  { value: 'norja', label: 'Norja' },
  { value: 'tanska', label: 'Tanska' },
  { value: 'viro', label: 'Viro' },
];

export default function OsoitetiedotPage() {
  const router = useRouter();
  const { lomakedata, setOsoitetiedot } = useFormContext();
  
  const [osoitetiedot, setOsoitetiedotState] = useState<Osoitetiedot>(lomakedata.osoitetiedot);
  const [virheet, setVirheet] = useState<Record<string, string>>({});
  const [koskettu, setKoskettu] = useState<Record<string, boolean>>({});
  const [validi, setValidi] = useState(false);
  
  useEffect(() => {
    const validointiTulos = validoiOsoitetiedot(osoitetiedot);
    setValidi(validointiTulos.validi);
    
    // Näytä virheet vain kosketuille kentille
    const naytettavatVirheet: Record<string, string> = {};
    Object.keys(validointiTulos.virheet).forEach(kentta => {
      if (koskettu[kentta]) {
        naytettavatVirheet[kentta] = validointiTulos.virheet[kentta];
      }
    });
    
    setVirheet(naytettavatVirheet);
  }, [osoitetiedot, koskettu]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setOsoitetiedotState(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setOsoitetiedotState(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id } = e.target;
    setKoskettu(prev => ({
      ...prev,
      [id]: true
    }));
  };
  
  const seuraavaSivu = () => {
    // Tallenna tiedot context:iin ennen seuraavalle sivulle siirtymistä
    setOsoitetiedot(osoitetiedot);
    router.push('/luottokorttitiedot');
  };
  
  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Osoitetiedot</h2>
          
          <InputField 
            id="katuosoite"
            label="Katuosoite"
            value={osoitetiedot.katuosoite}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.katuosoite}
            required
          />
          
          <InputField 
            id="postinumero"
            label="Postinumero"
            value={osoitetiedot.postinumero}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.postinumero}
            required
          />
          
          <InputField 
            id="paikkakunta"
            label="Paikkakunta"
            value={osoitetiedot.paikkakunta}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.paikkakunta}
            required
          />
          
          <SelectField
            id="maa"
            label="Maa"
            value={osoitetiedot.maa}
            onChange={handleSelectChange}
            onBlur={handleBlur}
            options={maaVaihtoehdot}
            error={virheet.maa}
            required
          />
          
          <NavigationButtons
            backUrl="/henkilotiedot"
            onSubmit={validi ? seuraavaSivu : undefined}
            disableNext={!validi}
            submitLabel="Seuraava"
          />
        </div>
      </section>
    </main>
  );
}