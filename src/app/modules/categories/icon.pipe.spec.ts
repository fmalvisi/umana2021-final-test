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

  it('test wip', () => {
    pipe.transform(2);
  });
});
