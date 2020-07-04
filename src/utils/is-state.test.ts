import { isState } from '.';

describe('isState', (): void => {
  it('should return true for non-functions', (): void => {
    expect(isState(0)).toBe(true);
    expect(isState(1)).toBe(true);
    expect(isState(-1)).toBe(true);
    expect(isState(NaN)).toBe(true);
    expect(isState('')).toBe(true);
    expect(isState('string')).toBe(true);
    expect(isState({})).toBe(true);
    expect(isState(new Date())).toBe(true);
    expect(isState(true)).toBe(true);
    expect(isState(false)).toBe(true);
    expect(isState(null)).toBe(true);
    expect(isState(undefined)).toBe(true);
  });

  it('should return false for functions', (): void => {
    expect(isState((): void => undefined)).toBe(false);
    expect(
      isState(function (): void {
        return;
      }),
    ).toBe(false);
    expect(isState(new Function())).toBe(false);
  });
});
