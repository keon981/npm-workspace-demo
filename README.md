# npm-workspaces-demo

> [References](https://earthly.dev/blog/npm-workspaces-monorepo/)

## init

### root

- package.json
  ```json
  {
    ...,
    "workspaces": ["./packages/*", "./apps/*"] //  tells npm that everything under the packages and apps directories is an npm workspace. Note that the workspace’s name is inferred from the name field of the corresponding package.json file.
  }
  ```

### packages/components

- package.json
  - Rename the `dependencies` key to `peerDependencies` and change the `name` field to include the scope:
    ```json
    {
      "name": "@npm-workspace-demo/components",
      "peerDependencies":{...},
        ...
    }
    ```
