import 'reflect-metadata';
import { Type } from '@remod/di';
import { ReModule } from './re.module';

export function getReModuleFromMetadata<T>(cls: Type<T>): ReModule {
  const annotations = Reflect.getMetadata('annotations', cls) || [];
  return annotations[0];
}
