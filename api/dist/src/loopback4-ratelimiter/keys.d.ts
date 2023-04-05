import { BindingKey, MetadataAccessor } from '@loopback/core';
import { RateLimitAction, RateLimitMetadata, RateLimitOptions } from './types';
export declare namespace RateLimitSecurityBindings {
    const RATELIMIT_SECURITY_ACTION: BindingKey<RateLimitAction>;
    const METADATA: BindingKey<RateLimitMetadata | undefined>;
    const CONFIG: BindingKey<RateLimitOptions | null>;
}
export declare const RATELIMIT_METADATA_ACCESSOR: MetadataAccessor<RateLimitMetadata, MethodDecorator>;
