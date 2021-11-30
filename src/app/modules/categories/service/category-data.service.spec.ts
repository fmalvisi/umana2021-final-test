import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CategoryDataService } from './category-data.service';

describe('CategoryDataService', () => {
  let service: CategoryDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [CategoryDataService],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ID Called', () => {
    spyOn(service['messageSource'], 'next');
    service.getCatId(5);
    expect(service['messageSource'].next).toHaveBeenCalledWith(5);
  });
});
