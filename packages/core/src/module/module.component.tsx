import 'reflect-metadata';
import React, { FC, useContext, useMemo } from 'react';
import { ReflectiveInjector, ResolvedReflectiveProvider } from '@remod/di';
import { ModuleContextData, ModuleContext } from './module.context';

export type ModuleComponent = FC;

export function createModuleComponent(
  moduleName: string,
  resolvedProviders: ResolvedReflectiveProvider[],
  Context: ModuleContext
): ModuleComponent {
  const ModuleComponent: FC = ({ children }) => {
    const parentModuleContextData = useContext(Context);
    const parentInjector = parentModuleContextData.injector;
    const contextData = useMemo<ModuleContextData>(() => {
      const injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, parentInjector);
      return { injector };
    }, [parentInjector]);

    return <Context.Provider value={contextData}>{children}</Context.Provider>;
  };

  ModuleComponent.displayName = moduleName;

  return ModuleComponent;
}
