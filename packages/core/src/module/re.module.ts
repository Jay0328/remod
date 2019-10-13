import { Provider, makeDecorator, TypeDecorator } from '@remod/di';

export interface ReModuleDecorator {
  (obj?: ReModule): TypeDecorator;
  new (obj?: ReModule): ReModule;
}

export interface ReModule {
  readonly providers?: Provider[];
}

export const defaultReModule = {
  providers: []
};

//  eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ReModule: ReModuleDecorator = makeDecorator('ReModule', defaultReModule) as any;
