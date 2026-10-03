// Byline registry for the blog generators. Source of truth lives in
// src/data/authors.ts; only real people or the honest team attribution may
// appear there (no personas). See that file for the rule.
import { authors as registry, toPostAuthorRef } from '../src/data/authors';

export const authors = registry.map(toPostAuthorRef);
