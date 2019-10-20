import { createContext, Context } from 'react';
import { ReflectiveInjector } from '@remod/di';

export interface ModuleContextData {
  injector: ReflectiveInjector;
}

export type ModuleContext = Context<ModuleContextData>;

export function createModuleContext(): ModuleContext {
  return createContext<ModuleContextData>({} as ModuleContextData);
}

export const ModuleContext = createModuleContext();
