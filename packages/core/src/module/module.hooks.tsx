import { useContext, useMemo } from 'react';
import { ReflectiveInjector } from '@remod/di';
import { ModuleContextData, ModuleContext } from './module.context';

export type UseModule = () => ModuleContextData;

export function createUseModule(Context: ModuleContext): UseModule {
  return () => useContext(Context);
}

export const useModule = createUseModule(ModuleContext);

/**
 * @todo
 * To be type friendly for `providers`.
 */
//  eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useProviders(injector: ReflectiveInjector, providers: any[]) {
  const memoizedProviders = useMemo(() => providers, providers);
  return useMemo(() => memoizedProviders.map(provider => injector.get(provider)), [injector, memoizedProviders]);
}
