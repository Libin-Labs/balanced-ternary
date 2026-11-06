# @lp-labs/balanced-ternary

Canonical signed balanced-ternary bigint representation.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/balanced-ternary
```

## Working example

```js
import { encodeBalanced, decodeBalanced } from '@lp-labs/balanced-ternary';
if (encodeBalanced(8n) !== '10T' || decodeBalanced('10T') !== 8n) throw new Error('Ternary');
```

CommonJS: `const api = require('@lp-labs/balanced-ternary')`.

## Behavior, customization and limits

encodeBalanced/decodeBalanced use T=-1, 0=0 and 1=1, most significant digit first. No separate sign, aliases, whitespace or leading zeros. Zero is "0". Input/output bigints bounded to 4096 bits, text to 4096 units. O(digits) arithmetic, stateless.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function encodeBalanced(value: bigint): string;
export declare function decodeBalanced(text: string): bigint;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
