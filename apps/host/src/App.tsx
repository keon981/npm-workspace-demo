import { lazy, Suspense, useEffect, type ComponentType } from 'react'

import './App.css'

type ImportFn<T> = () => Promise<{ default: ComponentType<T> }>

const safeLazy = <T,>(importFunction: ImportFn<T>) => {
  let retries = 0;
  const tryImport = async () => {
    try {
      return await importFunction();
    } catch (error) {
      // 最多重試 3 次
      if (retries < 3) {
        retries++;
        return tryImport();
      }
      throw error;
    }
  };

  return lazy(async () => {
    return await tryImport();
  });
};

// @ts-expect-error: Dynamic import
const LoginWeb = safeLazy(() => import('@remote-login').catch((err)=> {
  console.warn('err', err);
  return { default:() => <Web>Server Error</Web> }
}));

function App() {
  useEffect(() => {
    const htmlRoot = window.document.documentElement;
    htmlRoot.className = 'dark';
  }, []);

  return (
    <>
			<Suspense fallback={<Web>Loading...</Web>}>
				<LoginWeb />
			</Suspense>
    </>
  )
}

export default App

function Web ({ children }: { children: React.ReactNode }) {
  return (
    <div className='text-2xl' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </div>
  )
}