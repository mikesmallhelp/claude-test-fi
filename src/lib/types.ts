export interface Henkilotiedot {
  etunimi: string;
  sukunimi: string;
  syntymaaika: string;
  sahkoposti: string;
  puhelinnumero: string;
}

export interface Osoitetiedot {
  katuosoite: string;
  postinumero: string;
  paikkakunta: string;
  maa: string;
}

export interface Luottokorttitiedot {
  nimikortissa: string;
  kortinnumero: string;
  voimassaolo: string;
  cvv: string;
  korttityyppi: string;
}

export interface Lomakedata {
  henkilotiedot: Henkilotiedot;
  osoitetiedot: Osoitetiedot;
  luottokorttitiedot: Luottokorttitiedot;
}