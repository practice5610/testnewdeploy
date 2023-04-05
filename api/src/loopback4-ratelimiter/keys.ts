import { BindingKey, MetadataAccessor } from '@loopback/core';

import { RateLimitAction, RateLimitMetadata, RateLimitOptions } from './types';

export namespace RateLimitSecurityBindings {
  export const RATELIMIT_SECURITY_ACTION = BindingKey.create<RateLimitAction>(
    'sf.security.ratelimit.actions'
  );

  export const METADATA = BindingKey.create<RateLimitMetadata | undefined>(
    'sf.security.ratelimit.operationMetadata'
  );

  export const CONFIG = BindingKey.create<RateLimitOptions | null>('sf.security.ratelimit.config');
}

export const RATELIMIT_METADATA_ACCESSOR = MetadataAccessor.create<
  RateLimitMetadata,
  MethodDecorator
>('sf.security.ratelimit.operationMetadata.accessor');
