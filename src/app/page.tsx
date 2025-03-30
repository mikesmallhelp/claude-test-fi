"use client";

import NavigationButtons from "@/components/NavigationButtons";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tervetuloa lomakesovellukseen</h2>
          
          <p className="mb-6">
            Tällä lomakkeella kerätään tietoja useammalla sivulla. Sinun tulee täyttää:
          </p>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Henkilötiedot</li>
            <li>Osoitetiedot</li>
            <li>Luottokorttitiedot</li>
          </ul>
          
          <p className="mb-6">
            Voit siirtyä seuraavalle sivulle vasta kun olet täyttänyt kaikki pakolliset tiedot.
          </p>
          
          <NavigationButtons
            nextUrl="/henkilotiedot"
          />
        </div>
      </section>
    </main>
  );
}
