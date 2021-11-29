import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListItemsComponent } from './list-items.component';

class superItemService {
  objects = [
    {
      "id": 1,
      "name": "Yankee Candle",
      "description": "Usata",
      "price": 15.5,
      "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
      "category": 0,
      "owner": 0
    }
  ];

}

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ListItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach( async () => {
    httpMock = TestBed.inject(HttpTestingController);
    fixture = await TestBed.createComponent(ListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return to home', () => {
    spyOn(component['router'], "navigate");
    component.returnHome();

    expect(component['router'].navigate).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalledTimes(1);
    expect(component['router'].navigate).toHaveBeenCalledOnceWith(['/']);
  })
});
