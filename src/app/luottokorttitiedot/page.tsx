"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import NavigationButtons from '@/components/NavigationButtons';
import { useFormContext } from '@/lib/FormContext';
import { validoiLuottokorttitiedot } from '@/lib/validointi';
import { Luottokorttitiedot } from '@/lib/types';

const korttityypit = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
  { value: 'amex', label: 'American Express' },
  { value: 'diners', label: 'Diners Club' },
];

export default function LuottokorttitiedotPage() {
  const router = useRouter();
  const { lomakedata, setLuottokorttitiedot } = useFormContext();
  
  const [luottokorttitiedot, setLuottokorttitiedotState] = useState<Luottokorttitiedot>(lomakedata.luottokorttitiedot);
  const [virheet, setVirheet] = useState<Record<string, string>>({});
  const [koskettu, setKoskettu] = useState<Record<string, boolean>>({});
  const [validi, setValidi] = useState(false);
  
  useEffect(() => {
    const validointiTulos = validoiLuottokorttitiedot(luottokorttitiedot);
    setValidi(validointiTulos.validi);
    
    // Näytä virheet vain kosketuille kentille
    const naytettavatVirheet: Record<string, string> = {};
    Object.keys(validointiTulos.virheet).forEach(kentta => {
      if (koskettu[kentta]) {
        naytettavatVirheet[kentta] = validointiTulos.virheet[kentta];
      }
    });
    
    setVirheet(naytettavatVirheet);
  }, [luottokorttitiedot, koskettu]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLuottokorttitiedotState(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setLuottokorttitiedotState(prev => ({
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
    setLuottokorttitiedot(luottokorttitiedot);
    router.push('/yhteenveto');
  };
  
  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Luottokorttitiedot</h2>
          
          <InputField 
            id="nimikortissa"
            label="Nimi kortissa"
            placeholder="ETUNIMI SUKUNIMI"
            value={luottokorttitiedot.nimikortissa}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.nimikortissa}
            required
          />
          
          <InputField 
            id="kortinnumero"
            label="Kortin numero"
            placeholder="1234 5678 9012 3456"
            value={luottokorttitiedot.kortinnumero}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.kortinnumero}
            required
          />
          
          <InputField 
            id="voimassaolo"
            label="Voimassaolo"
            placeholder="MM/VV"
            value={luottokorttitiedot.voimassaolo}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.voimassaolo}
            required
          />
          
          <InputField 
            id="cvv"
            label="CVV"
            placeholder="123"
            value={luottokorttitiedot.cvv}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.cvv}
            required
          />
          
          <SelectField
            id="korttityyppi"
            label="Korttityyppi"
            value={luottokorttitiedot.korttityyppi}
            onChange={handleSelectChange}
            onBlur={handleBlur}
            options={korttityypit}
            error={virheet.korttityyppi}
            required
          />
          
          <NavigationButtons
            backUrl="/osoitetiedot"
            onSubmit={validi ? seuraavaSivu : undefined}
            disableNext={!validi}
            submitLabel="Seuraava"
          />
        </div>
      </section>
    </main>
  );
}