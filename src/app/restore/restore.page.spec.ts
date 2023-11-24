import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RestorePage } from './restore.page';
import { UserService } from 'src/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

class MockUserService {
  
}

describe('RestorePage', () => {
  let component: RestorePage;
  let fixture: ComponentFixture<RestorePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RestorePage],
      providers: [
        { provide: UserService, useClass: MockUserService },
      ],
      imports: [HttpClientModule], 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
