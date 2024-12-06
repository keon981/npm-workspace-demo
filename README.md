# npm-workspace-demo

## Description

Microfrontends promote flexibility in technology choices, allowing teams to **adopt new frameworks** and libraries for specific parts of the application  **without impacting the entire system** .

## Tech stack

- `module-federation/vite`: This plugin makes Module Federation work together with Vite.
- **Vite** : Vite has emerged as a **leading frontend build tool** known for its lightning-fast development experience and efficient production builds.

## Design

* **Host Application:** The main application that integrates and displays microfrontends.
* **Remote Application:** Independent applications representing specific features or components, served as microfrontends.
  * Each microfrontend can be  **deployed independently** , without affecting the rest of the application.
  * This **reduces the risk of downtime** during deployments and allows for rapid iteration and feature releases.
* **Exposes:** Modules or components that a remote application makes available to the host application.
* **Shared Modules:** Common dependencies used by both host and remote applications, ensuring version consistency and reducing bundle sizes.

## Features

## Getting started

> From this directory execute:

```
npm run preview:deps
```

Open your browser at [http://localhost:3000](http://localhost:3000/) to see the amazing result.( server host can't use)
