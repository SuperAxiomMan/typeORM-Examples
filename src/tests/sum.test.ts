/* eslint-disable no-console */
import { sum } from '../utils/sum';


beforeAll(async () => {
    console.log('Execute at the start');
});

afterAll(async () => {
    console.log('Execute at the end');
});

test('Test the sum function', () => {
  const restult = sum(1, 3);
  expect(restult).toBe(4);
});