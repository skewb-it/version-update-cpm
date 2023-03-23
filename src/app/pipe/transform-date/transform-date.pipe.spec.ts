import { TransformDatePipe } from './transform-date.pipe';

describe('TransformDatePipe', () => {
  it('create an instance', () => {
    const pipe = new TransformDatePipe(null);
    expect(pipe).toBeTruthy();
  });
});
