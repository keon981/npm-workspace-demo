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
  return { default:() => <div>Error</div> }
}));

function App() {
  useEffect(() => {
    const htmlRoot = window.document.documentElement;
    htmlRoot.className = 'dark';
  }, []);

  return (
    <>
			<Suspense fallback={<Loading />}>
				<LoginWeb />
			</Suspense>
    </>
  )
}

export default App

function Loading () {
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      loading...
    </div>
    )
}