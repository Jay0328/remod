import 'reflect-metadata';
import { ReflectiveInjector, Provider } from '@remod/di';
import { ModuleContext } from './module.context';
import { ModuleBootstrap, createModuleBootstrap } from './module.bootstrap';
import { METADATA } from '../shared/metadata.constants';

export interface ModuleOptions {
  readonly name?: string;
  readonly providers?: Provider[];
  readonly Context?: ModuleContext;
}

export interface Module extends ModuleBootstrap {}

export function Module(options?: ModuleOptions): Module {
  const { name = 'Module', providers = [], Context = ModuleContext } = options || {};
  const resolvedProviders = ReflectiveInjector.resolve(providers);
  const ModuleBootstrap = createModuleBootstrap(name, resolvedProviders, Context);

  Reflect.defineMetadata(METADATA.PROVIDERS, providers, ModuleBootstrap);

  return ModuleBootstrap;
}
