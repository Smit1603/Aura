'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [nextMessage, setNextMessage] = useState<string>('Loading...');
  const [fastApiMessage, setFastApiMessage] = useState<string>('Loading...');

  useEffect(() => {
    // Fetch from Next.js API
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setNextMessage(data.message))
      .catch(() => setNextMessage('Error fetching Next.js API'));

    // Fetch from FastAPI Backend
    fetch('http://localhost:8000/')
      .then((res) => res.json())
      .then((data) => setFastApiMessage(data.message))
      .catch(() => setFastApiMessage('Error fetching FastAPI'));
  }, []);

  return (
    <main>
      <h1>Backend Connectivity Test</h1>

      <section>
        <h2>Next.js Backend</h2>
        <p data-testid="next-msg">{nextMessage}</p>
      </section>

      <section>
        <h2>FastAPI Backend</h2>
        <p data-testid="fastapi-msg">{fastApiMessage}</p>
      </section>
    </main>
  );
}
