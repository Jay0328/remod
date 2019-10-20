import 'reflect-metadata';
import React, { FC, ComponentType, useContext, useMemo } from 'react';
import { ReflectiveInjector, ResolvedReflectiveProvider } from '@remod/di';
import { ModuleContextData, ModuleContext } from './module.context';
import { getModuleDisplayName } from './module.utils';

export interface ModuleBootstrap {
  <P>(WrappedComponent: ComponentType<P>): FC<P>;
}

export function createModuleBootstrap(
  moduleName: string,
  resolvedProviders: ResolvedReflectiveProvider[],
  Context: ModuleContext
): ModuleBootstrap {
  function ModuleBootstrap<P>(WrappedComponent: ComponentType<P>) {
    const Bootstrap: FC<P> = props => {
      const parentModuleContextData = useContext(Context);
      const parentInjector = parentModuleContextData.injector;
      const contextData = useMemo<ModuleContextData>(() => {
        const injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, parentInjector);
        return { injector };
      }, [parentInjector]);

      return (
        <Context.Provider value={contextData}>
          <WrappedComponent {...props} />
        </Context.Provider>
      );
    };

    Bootstrap.displayName = getModuleDisplayName(moduleName, WrappedComponent);

    return Bootstrap;
  }

  return ModuleBootstrap;
}
