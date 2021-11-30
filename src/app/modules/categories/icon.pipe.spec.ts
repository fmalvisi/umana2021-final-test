// import { IconPipe } from './icon.pipe';

// describe('IconPipe', () => {
//   fit('create an instance', () => {
//     const pipe = new IconPipe();
//     expect(pipe).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { IconPipe } from './icon.pipe';

describe('IconPipe', () => {
  let pipe: IconPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [IconPipe] });
    pipe = TestBed.inject(IconPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
