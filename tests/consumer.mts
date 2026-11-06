import { encodeBalanced, decodeBalanced } from '@lp-labs/balanced-ternary';
if (encodeBalanced(8n) !== '10T' || decodeBalanced('10T') !== 8n) throw new Error('Ternary');
// @ts-expect-error invalid argument must be rejected by declarations
encodeBalanced(8);
