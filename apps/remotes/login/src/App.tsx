import { useEffect } from 'react'
import { LoginCard } from './components/LoginCard';

function App() {
  useEffect(() => {
    const htmlRoot = window.document.documentElement;
    htmlRoot.className = 'dark';
  }, []);

  return (
    <section className="flex items-center justify-center" style={{ height: '100vh' }}>
      <LoginCard />
    </section>
  )
}

export default App
