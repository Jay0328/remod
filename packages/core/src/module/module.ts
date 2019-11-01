import 'reflect-metadata';
import { ReflectiveInjector, Provider } from '@remod/di';
import { ModuleContext } from './module.context';
import { ModuleComponent, createModuleComponent } from './module.component';
import { METADATA } from '../shared/metadata.constants';

export interface ModuleOptions {
  readonly name?: string;
  readonly providers?: Provider[];
  readonly context?: ModuleContext;
}

export interface Module extends ModuleComponent {}

export function Module(options?: ModuleOptions): Module {
  const { name = 'Module', providers = [], context = ModuleContext } = options || {};
  const resolvedProviders = ReflectiveInjector.resolve(providers);
  const ModuleComponent = createModuleComponent(name, resolvedProviders, context);

  Reflect.defineMetadata(METADATA.PROVIDERS, providers, ModuleComponent);

  return ModuleComponent;
}
