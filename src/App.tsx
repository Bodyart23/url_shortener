import { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Shortener from './components/Shortener/Shortener';
import Statistics from './components/Statistics/Statistics';
import Cta from './components/Cta/Cta';
import Footer from './components/Footer/Footer';
import type { ShortLink } from './types';

function App() {
  const [links, setLinks] = useState<ShortLink[]>([]);

  const addLink = (link: ShortLink) => {
    setLinks((prev) => [link, ...prev]);
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Shortener links={links} onAddLink={addLink} />
        <Statistics />
        <Cta />
      </main>
      <Footer />
    </>
  );
}

export default App;
