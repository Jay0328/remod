import { useContext, useMemo } from 'react';
import { ReflectiveInjector } from '@remod/di';
import { ReModuleContextData, ReModuleContext } from './re-module.context';

export type UseReModule = () => ReModuleContextData;

export function createUseReModule(Context: ReModuleContext): UseReModule {
  function useReModule() {
    const data = useContext(Context);

    if (!data) {
      /**
       * @todo add error message.
       */
      throw new Error('');
    }

    return data;
  }

  return useReModule;
}

//  eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseReModuleInjector = <T, R = any>(injector: ReflectiveInjector, injected: T) => R;

//  eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useReModuleInjectorWithInjector<T, R = any>(injector: ReflectiveInjector, injected: T): R {
  return useMemo<R>(() => injector.get(injected), [injector, injected]);
}

export function createUseReModuleInjector(useReModule: UseReModule): UseReModuleInjector {
  //  eslint-disable-next-line @typescript-eslint/no-explicit-any
  function useReModuleInjector<T, R = any>(injected: T): R {
    const { injector } = useReModule();
    return useReModuleInjectorWithInjector(injector, injected);
  }

  return useReModuleInjector;
}

export const useReModule = createUseReModule(ReModuleContext);
export const useReModuleInjector = createUseReModuleInjector(useReModule);
