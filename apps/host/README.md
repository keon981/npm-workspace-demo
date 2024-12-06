# **Host Application**

> React + TypeScript + Vite

## [Module federation configuration](https://module-federation.io/zh/configure/index.html)

The host app configuration specifies its name, the filename of its exposed remote entry remoteEntry.js, and importantly, the configuration of the remote application to load.

```typescript
/* host/vite.config.ts */
import { defineConfig } from 'vite';
import { federation } from '@module-federation/vite'; 👈

export default defineConfig({
  [...]
  plugins: [
    [...]
    federation({ 👈
      name: "host",
      remotes: {
        remote: {
          type: "module",
          name: "remote",
          entry: "https://[...]/remoteEntry.js", // remote preview url
          entryGlobalName: "remote",
          shareScope: "default",
        },
      },
      filename: "remoteEntry.js",
      shared: ["react", "react-dom"],
    }),
  ]
  [...]
});
```

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