import { describe, test, expect } from 'bun:test';
import { isLoopbackAddress } from '../src/mcp/http-transport.ts';

describe('isLoopbackAddress (local-operator trust gate)', () => {
  test('accepts IPv4 loopback', () => {
    expect(isLoopbackAddress('127.0.0.1')).toBe(true);
  });

  test('accepts IPv6 loopback', () => {
    expect(isLoopbackAddress('::1')).toBe(true);
  });

  test('accepts IPv4-mapped IPv6 loopback', () => {
    expect(isLoopbackAddress('::ffff:127.0.0.1')).toBe(true);
  });

  test('rejects private/other addresses (fail-closed)', () => {
    expect(isLoopbackAddress('192.168.1.10')).toBe(false);
    expect(isLoopbackAddress('10.0.0.1')).toBe(false);
    expect(isLoopbackAddress('172.17.0.2')).toBe(false);
    expect(isLoopbackAddress('2001:db8::1')).toBe(false);
  });

  test('rejects unknown/missing address (fail-closed)', () => {
    expect(isLoopbackAddress(null)).toBe(false);
    expect(isLoopbackAddress(undefined)).toBe(false);
    expect(isLoopbackAddress('unknown')).toBe(false);
  });
});
