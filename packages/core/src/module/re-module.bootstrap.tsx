import React, { FC, ComponentType, useContext, useMemo } from 'react';
import { Type, ReflectiveInjector } from '@remod/di';
import { ReModuleContext, ReModuleContextData } from './re-module.context';
import { getReModuleFromMetadata } from './get-re-module-from-metadata';

export type ReModuleBootstrapComponent<P> = FC<P>;

export interface ReModuleBootstrap {
  <P>(WrappedComponent: ComponentType<P>): ReModuleBootstrapComponent<P>;
}

export function createReModuleBootstrap<T>(
  cls: Type<T>,
  Context: ReModuleContext = ReModuleContext
): ReModuleBootstrap {
  const ReModule = getReModuleFromMetadata(cls);
  const { providers } = ReModule;
  const resolvedProviders = ReflectiveInjector.resolve(providers || []);

  function ReModuleBootstrap<P>(WrappedComponent: ComponentType<P>) {
    const ReModuleBootstrapComponent: ReModuleBootstrapComponent<P> = props => {
      const parentModuleContextData = useContext(Context);

      if (!parentModuleContextData) {
        /**
         * @todo add error message.
         */
        throw new Error('');
      }

      const parentInjector = parentModuleContextData.injector;
      const injector = useMemo(() => ReflectiveInjector.fromResolvedProviders(resolvedProviders, parentInjector), [
        parentInjector
      ]);
      const contextData = useMemo<ReModuleContextData>(() => ({ injector }), [injector]);

      return (
        <Context.Provider value={contextData}>
          <WrappedComponent {...props} />
        </Context.Provider>
      );
    };

    ReModuleBootstrapComponent.displayName = cls.name;

    return ReModuleBootstrapComponent;
  }

  return ReModuleBootstrap;
}
