import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/api/generated';
import { ShowUsersComponent } from './show-users.component';

class mockdata{
  utenti : Array<User> = [{
    id : 1,
    name : "test1",
    surname : "test1",
    email : "test1",
    dob : "test1"
  },
  {
    id : 2,
      name : "test2",
      surname : "test2",
      email : "test2",
      dob : "test2"
  }
];
data : Observable<any> = {
  this.utenti
}

}

fdescribe('ShowUsersComponent', () => {
  let component: ShowUsersComponent;
  let fixture: ComponentFixture<ShowUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
