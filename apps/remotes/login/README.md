# **Remote Application **

> React + TypeScript + Vite

## [Module federation configuration](https://module-federation.io/zh/configure/index.html)

The host app configuration specifies its name, the filename of its exposed remote entry remoteEntry.js, and importantly, the configuration of the remote application to load.

```typescript
/* remote/vite.config.ts */
import { defineConfig } from 'vite';
import { federation } from '@module-federation/vite'; 👈

export default defineConfig({
  [...]
  plugins: [
    [...] 
    federation({ 👈
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./remote-app": "./src/App.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ]
  [...]
});
```
In this remote app configuration, we define a remoteEntry.js file that will expose the App component.
The shared property ensures that both host and remote applications use the same react library.

## Load the Remote App

In your host app, you can now import and use the remote app with defineAsyncComponent

```typescript
const Remote = lazy(
	// @ts-ignore
	async () => import('remote/remote-app'),
);
function App() {
  return (
    <>
			<Suspense fallback={<Web>Loading...</Web>}>
				<LoginWeb />
			</Suspense>
    </>
  )
}
```