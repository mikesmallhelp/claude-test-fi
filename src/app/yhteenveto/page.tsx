"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import NavigationButtons from '@/components/NavigationButtons';
import { useFormContext } from '@/lib/FormContext';

export default function YhteenvetoPage() {
  const router = useRouter();
  const { lomakedata } = useFormContext();
  
  // Kartan korttityypin arvoista suomenkielisiin nimiin
  const korttityyppiMap: Record<string, string> = {
    'visa': 'Visa',
    'mastercard': 'Mastercard',
    'amex': 'American Express',
    'diners': 'Diners Club'
  };
  
  // Kartan maan arvoista suomenkielisiin nimiin
  const maaMap: Record<string, string> = {
    'suomi': 'Suomi',
    'ruotsi': 'Ruotsi',
    'norja': 'Norja',
    'tanska': 'Tanska',
    'viro': 'Viro'
  };
  
  // Korttinumeron viimeisten 4 numeron näyttäminen
  const maskattuKorttinumero = lomakedata.luottokorttitiedot.kortinnumero
    ? `**** **** **** ${lomakedata.luottokorttitiedot.kortinnumero.slice(-4)}`
    : '';
  
  const aloitaAlusta = () => {
    router.push('/');
  };
  
  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Yhteenveto</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Henkilötiedot</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p><span className="font-medium">Nimi:</span> {lomakedata.henkilotiedot.etunimi} {lomakedata.henkilotiedot.sukunimi}</p>
              <p><span className="font-medium">Syntymäaika:</span> {lomakedata.henkilotiedot.syntymaaika}</p>
              <p><span className="font-medium">Sähköposti:</span> {lomakedata.henkilotiedot.sahkoposti}</p>
              <p><span className="font-medium">Puhelinnumero:</span> {lomakedata.henkilotiedot.puhelinnumero}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Osoitetiedot</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p><span className="font-medium">Katuosoite:</span> {lomakedata.osoitetiedot.katuosoite}</p>
              <p><span className="font-medium">Postinumero:</span> {lomakedata.osoitetiedot.postinumero}</p>
              <p><span className="font-medium">Paikkakunta:</span> {lomakedata.osoitetiedot.paikkakunta}</p>
              <p><span className="font-medium">Maa:</span> {maaMap[lomakedata.osoitetiedot.maa] || lomakedata.osoitetiedot.maa}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Maksutiedot</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p><span className="font-medium">Nimi kortissa:</span> {lomakedata.luottokorttitiedot.nimikortissa}</p>
              <p><span className="font-medium">Korttityyppi:</span> {korttityyppiMap[lomakedata.luottokorttitiedot.korttityyppi] || lomakedata.luottokorttitiedot.korttityyppi}</p>
              <p><span className="font-medium">Kortin numero:</span> {maskattuKorttinumero}</p>
              <p><span className="font-medium">Voimassaolo:</span> {lomakedata.luottokorttitiedot.voimassaolo}</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-green-600 font-medium mb-4">
              Kaikki tiedot on nyt tallennettu onnistuneesti!
            </p>
            
            <NavigationButtons
              backUrl="/luottokorttitiedot"
              onSubmit={aloitaAlusta}
              submitLabel="Aloita alusta"
            />
          </div>
        </div>
      </section>
    </main>
  );
}