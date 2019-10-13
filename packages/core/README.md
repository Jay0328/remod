# @remod/core

## Installation

```
# NPM
npm install @remod/core --save

# Yarn
yarn add @remod/core
```

### Usage

```tsx
import React, { FC } from 'react';
import {
  ReModule,
  ReModuleBootstrap,
  useReModule,
  useReModuleInjector,
  useReModuleInjectorWithInjector
} from '@remod/core';
import { Injectable } from '@remod/di';

class Http {}

@Injectable()
class Service {
  constructor(private http: Http) {}
}

@ReModule({
  providers: [Service, Http]
})
class AppModule {}

const Child: FC = () => {
  const http = useReModuleInjector(Http);

  return (
    <div>
      ...
    </div>
  );
}

const App: FC = () => {
  const { injector } = useReModule();
  const service = useReModuleInjectorWithInjector(injector, Service);

  //  ...

  return (
    <Child />
  );
};

const AppBootstrap = ReModuleBootstrap(AppModule)(App);
```
