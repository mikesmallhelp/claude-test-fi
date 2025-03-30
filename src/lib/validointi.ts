import { Henkilotiedot, Osoitetiedot, Luottokorttitiedot } from './types';

export function validoiHenkilotiedot(henkilotiedot: Partial<Henkilotiedot>): { validi: boolean; virheet: Record<string, string> } {
  const virheet: Record<string, string> = {};
  
  if (!henkilotiedot.etunimi || henkilotiedot.etunimi.trim() === '') {
    virheet.etunimi = 'Etunimi on pakollinen';
  }
  
  if (!henkilotiedot.sukunimi || henkilotiedot.sukunimi.trim() === '') {
    virheet.sukunimi = 'Sukunimi on pakollinen';
  }
  
  if (!henkilotiedot.syntymaaika) {
    virheet.syntymaaika = 'Syntymäaika on pakollinen';
  } else {
    const dateRegex = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
    if (!dateRegex.test(henkilotiedot.syntymaaika)) {
      virheet.syntymaaika = 'Syntymäaika tulee olla muodossa pp.kk.vvvv';
    }
  }
  
  if (!henkilotiedot.sahkoposti) {
    virheet.sahkoposti = 'Sähköposti on pakollinen';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(henkilotiedot.sahkoposti)) {
      virheet.sahkoposti = 'Sähköposti ei ole oikeassa muodossa';
    }
  }
  
  if (!henkilotiedot.puhelinnumero) {
    virheet.puhelinnumero = 'Puhelinnumero on pakollinen';
  } else {
    const phoneRegex = /^(\+?[0-9]{1,3})?[0-9]{6,14}$/;
    if (!phoneRegex.test(henkilotiedot.puhelinnumero.replace(/\s/g, ''))) {
      virheet.puhelinnumero = 'Puhelinnumero ei ole oikeassa muodossa';
    }
  }
  
  return {
    validi: Object.keys(virheet).length === 0,
    virheet
  };
}

export function validoiOsoitetiedot(osoitetiedot: Partial<Osoitetiedot>): { validi: boolean; virheet: Record<string, string> } {
  const virheet: Record<string, string> = {};
  
  if (!osoitetiedot.katuosoite || osoitetiedot.katuosoite.trim() === '') {
    virheet.katuosoite = 'Katuosoite on pakollinen';
  }
  
  if (!osoitetiedot.postinumero) {
    virheet.postinumero = 'Postinumero on pakollinen';
  } else {
    // Suomen postinumero on 5 numeroa
    const postinumeroRegex = /^\d{5}$/;
    if (!postinumeroRegex.test(osoitetiedot.postinumero)) {
      virheet.postinumero = 'Postinumeron tulee sisältää 5 numeroa';
    }
  }
  
  if (!osoitetiedot.paikkakunta || osoitetiedot.paikkakunta.trim() === '') {
    virheet.paikkakunta = 'Paikkakunta on pakollinen';
  }
  
  if (!osoitetiedot.maa || osoitetiedot.maa.trim() === '') {
    virheet.maa = 'Maa on pakollinen';
  }
  
  return {
    validi: Object.keys(virheet).length === 0,
    virheet
  };
}

export function validoiLuottokorttitiedot(luottokorttitiedot: Partial<Luottokorttitiedot>): { validi: boolean; virheet: Record<string, string> } {
  const virheet: Record<string, string> = {};
  
  if (!luottokorttitiedot.nimikortissa || luottokorttitiedot.nimikortissa.trim() === '') {
    virheet.nimikortissa = 'Nimi kortissa on pakollinen';
  }
  
  if (!luottokorttitiedot.kortinnumero) {
    virheet.kortinnumero = 'Kortinnumero on pakollinen';
  } else {
    // Poista välilyönnit ja viivat
    const numero = luottokorttitiedot.kortinnumero.replace(/[\s-]/g, '');
    // Luottokorttinumero sisältää vain numeroita ja on 13-19 merkkiä pitkä
    const korttiRegex = /^\d{13,19}$/;
    if (!korttiRegex.test(numero)) {
      virheet.kortinnumero = 'Kortinnumero ei ole oikeassa muodossa';
    }
    
    // Luhn -algoritmi tarkistus voitaisiin myös toteuttaa tässä
  }
  
  if (!luottokorttitiedot.voimassaolo) {
    virheet.voimassaolo = 'Kortin voimassaoloaika on pakollinen';
  } else {
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(luottokorttitiedot.voimassaolo)) {
      virheet.voimassaolo = 'Voimassaoloajan tulee olla muodossa KK/VV';
    }
  }
  
  if (!luottokorttitiedot.cvv) {
    virheet.cvv = 'CVV-koodi on pakollinen';
  } else {
    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(luottokorttitiedot.cvv)) {
      virheet.cvv = 'CVV-koodin tulee olla 3-4 numeroa';
    }
  }
  
  if (!luottokorttitiedot.korttityyppi || luottokorttitiedot.korttityyppi.trim() === '') {
    virheet.korttityyppi = 'Korttityyppi on pakollinen';
  }
  
  return {
    validi: Object.keys(virheet).length === 0,
    virheet
  };
}