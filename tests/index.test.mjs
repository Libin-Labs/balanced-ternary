import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('reference positive values', () => {
  assert.equal(api.encodeBalanced(2n), '1T');
  assert.equal(api.encodeBalanced(8n), '10T');
  assert.equal(api.decodeBalanced('1T1'), 7n);
});
test('negative carries', () => {
  assert.equal(api.encodeBalanced(-2n), 'T1');
  assert.equal(api.decodeBalanced('T0T'), -10n);
});
test('zero and signs', () => {
  assert.equal(api.encodeBalanced(0n), '0');
  assert.equal(api.decodeBalanced('T'), -1n);
});
test('strict syntax', () => {
  for (const t of ['', '00', '2', '-1', 't', '1\n']) assert.throws(() => api.decodeBalanced(t));
});
test('bit and type budgets', () => {
  assert.throws(() => api.encodeBalanced(1n << 4096n));
  assert.throws(() => api.decodeBalanced('1'.repeat(4096)));
  assert.throws(() => api.encodeBalanced(1));
});
test('independent weighted digits', () => {
  for (let a = -1; a <= 1; a++)
    for (let b = -1; b <= 1; b++)
      for (let c = -1; c <= 1; c++) {
        const text =
          [a, b, c]
            .map((n) => (n < 0 ? 'T' : String(n)))
            .join('')
            .replace(/^0+/, '') || '0';
        assert.equal(api.decodeBalanced(text), BigInt(9 * a + 3 * b + c));
      }
});
