import { createContext, Context } from 'react';
import { ReflectiveInjector } from '@remod/di';

export interface ReModuleContextData {
  injector: ReflectiveInjector;
}

export type ReModuleContext = Context<ReModuleContextData>;

export function createReModuleContext(): ReModuleContext {
  return createContext<ReModuleContextData>({} as ReModuleContextData);
}

export const ReModuleContext = createReModuleContext();
