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
  useReModuleInjecteds
} from '@remod/core';
import { Injectable } from '@remod/di';

class Http {}

@Injectable()
class Service {
  constructor(private http: Http) {}
}

const ParentModule = ReModule({
  providers: [Http]
});

const ChildModule = ReModule({
  providers: [Service]
});

const Child: FC = () => {
  const { injector } = useReModule();
  const [service]: [Service] = useModuleInjecteds([Service]);

  return (
    <div>
      ...
    </div>
  );
}

const ChildBootstrap = ChildModule(Child);

const Parent: FC = () => {
  const { injector } = useReModule();
  const [http]: [Http] = useModuleInjecteds([Http]);

  //  ...

  return (
    <ChildBootstrap />
  );
};

const ParentBootstrap = ParentModule(Parent);
```
