function big(value: bigint): bigint {
  if (typeof value !== 'bigint') throw new TypeError('Expected bigint');
  const limit = (1n << 4096n) - 1n;
  if (value > limit || value < -limit) throw new RangeError('4096-bit budget exceeded');
  return value;
}
function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
export function encodeBalanced(value: bigint): string {
  big(value);
  if (value === 0n) return '0';
  let n = value,
    out = '';
  while (n !== 0n) {
    let r = n % 3n;
    n /= 3n;
    if (r === 2n) {
      r = -1n;
      n++;
    }
    if (r === -2n) {
      r = 1n;
      n--;
    }
    out = (r === -1n ? 'T' : String(r)) + out;
  }
  return out;
}
export function decodeBalanced(text: string): bigint {
  strictText(text, 4096);
  if (!text || (text.length > 1 && text[0] === '0')) throw new RangeError('Noncanonical ternary');
  let n = 0n;
  for (const c of text) {
    if (c !== 'T' && c !== '0' && c !== '1') throw new RangeError('Invalid digit');
    n = big(n * 3n + (c === 'T' ? -1n : c === '1' ? 1n : 0n));
  }
  return n;
}
