import React, { FC, ComponentType, useContext, useMemo } from 'react';
import { ReflectiveInjector, ResolvedReflectiveProvider } from '@remod/di';
import { ReModuleContext, ReModuleContextData } from './re-module.context';

export interface ReModuleBootstrap {
  <P>(WrappedComponent: ComponentType<P>): FC<P>;
}

function getBootstrapDisplayName(moduleName: string, WrappedComponent: ComponentType<any>) {
  const displayName = `${WrappedComponent.displayName || WrappedComponent.name || 'Unknown'}`;
  return `${moduleName}(${displayName})`;
}

export function createReModuleBootstrap(
  moduleName: string,
  resolvedProviders: ResolvedReflectiveProvider[],
  Context: ReModuleContext
): ReModuleBootstrap {
  function ReModuleBootstrap<P>(WrappedComponent: ComponentType<P>) {
    const Bootstrap: FC<P> = props => {
      const parentModuleContextData = useContext(Context);
      const parentInjector = parentModuleContextData.injector;
      const contextData = useMemo<ReModuleContextData>(() => {
        const injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, parentInjector);
        return { injector };
      }, [parentInjector]);

      return (
        <Context.Provider value={contextData}>
          <WrappedComponent {...props} />
        </Context.Provider>
      );
    };

    Bootstrap.displayName = getBootstrapDisplayName(moduleName, WrappedComponent);

    return Bootstrap;
  }

  return ReModuleBootstrap;
}
