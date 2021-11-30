import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Category } from 'src/app/core/api/generated';
import { CurrencyEurPipe } from 'src/app/shared/pipes/currency.pipe';
import { SuperItemService } from '../services/superItemService.service';

import { DetailsItemComponent } from './details-item.component';

describe('DetailsItemComponent', () => {
  let component: DetailsItemComponent;
  let fixture: ComponentFixture<DetailsItemComponent>;
  let service : SuperItemService;
  let httpMock : HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ DetailsItemComponent, CurrencyEurPipe],
      providers: [SuperItemService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(SuperItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should showCarouselItems', () => {
    component.showCarouselItems();
    expect(typeof Storage).not.toBeUndefined();
    expect(component.showCarouselItems).toBeTruthy();
  });

  xit('should getCategoryId', waitForAsync( () => {
    const objects = [
      {
        "id": 1,
        "name": "Casa",
        "description": "cose per la casa"
      }
    ];

    component.getCategoryId(1);
    
    expect(service).toBeTruthy();
    service.getCategoryById(1).then((res: Category) => {
      expect(res).toEqual(objects[0]);
      fixture.detectChanges();
      expectAsync(component.categoryObj).toBeResolved();
      expect(component.categoryObj).toBe(res);
      // expect(component.categoryName).toBe(res.name);
    });

  }));

  xit('should NOT getCategoryById', waitForAsync(() => {
    expect(service).toBeTruthy();
    spyOn(window, 'alert');
    spyOn(component['superService'], 'getCategoryById');
    const mockErrorResponse = {id: 2, status: 400, statusText: 'Bad Request'};
    
    component.getCategoryId(2);
    expect(component.getCategoryId).toBeTruthy();
    
    expect(component['superService'].getCategoryById).toHaveBeenCalledOnceWith(2);
    expect(component['superService'].getCategoryById).toThrowError;

    // service.getCategoryById(2).then(() => {

    // }, (error) =>{
    //     expect(error).toBeTruthy();
    //     expect(error.statusText).toEqual('Bad Request');
    //     expect(window.alert).toHaveBeenCalledWith("errore di chiamata API");
    // });
    expect(window.alert).toHaveBeenCalledWith("errore di chiamata API");

    const req = httpMock.expectOne('https://dev.frontend.local/api/v1/category/2');
    expect(req.request.method).toEqual('GET');
    req.flush({}, mockErrorResponse);

    httpMock.verify();

}));

});
