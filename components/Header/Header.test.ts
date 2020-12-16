import { describe, it, expect } from '@jest/globals';

const add = jest.fn(() => 3);

describe('first test suite', () => {
  it('works!', () => {
    expect(add()).toBe(3);
    expect(add).toHaveBeenCalledTimes(1);
  });
});
