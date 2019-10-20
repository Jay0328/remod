import { Provider, ReflectiveInjector } from '@remod/di';
import { ReModuleContext } from './re-module.context';
import { createReModuleBootstrap } from './re-module.bootstrap';

export interface ReModule {
  readonly name?: string;
  readonly providers?: Provider[];
  readonly Context?: ReModuleContext;
}

export function ReModule(reModule: ReModule) {
  const { name = 'ReModule', providers = [], Context = ReModuleContext } = reModule;
  const resolvedProviders = ReflectiveInjector.resolve(providers);
  const ReModuleBootstrap = createReModuleBootstrap(name, resolvedProviders, Context);

  return ReModuleBootstrap;
}
