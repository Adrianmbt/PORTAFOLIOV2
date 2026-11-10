import { useState } from 'react';
import Assistant from './components/Assistant';
import Header from './components/Header';
import Hero from './components/Hero';
import Trajectory from './components/Trajectory';

export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Trajectory onAsk={() => setAssistantOpen(true)} />
      </main>
      <Assistant open={assistantOpen} onOpenChange={setAssistantOpen} />
    </>
  );
}
