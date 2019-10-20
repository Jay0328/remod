import { useContext, useMemo } from 'react';
import { ReflectiveInjector } from '@remod/di';
import { ReModuleContextData, ReModuleContext } from './re-module.context';

export type UseReModule = () => ReModuleContextData;

export function createUseReModule(Context: ReModuleContext): UseReModule {
  function useReModule() {
    return useContext(Context);
  }

  return useReModule;
}

export const useReModule = createUseReModule(ReModuleContext);

/**
 * @todo
 * To be type friendly for `injecteds`.
 */
//  eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useReModuleInjecteds(injector: ReflectiveInjector, injecteds: any[]): any[] {
  const memoizedInjecteds = useMemo(() => injecteds, injecteds);
  return useMemo(() => memoizedInjecteds.map(injected => injector.get(injected)), [injector, memoizedInjecteds]);
}
