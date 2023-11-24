import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CursoPage } from './curso.page';
import { LocalApiService } from 'src/services/localapi.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
class MockActivatedRoute {
  queryParams = of({ idProfesor: 'mockedIdProfesor', idCurso: 'mockedIdCurso' });
}

describe('CursoPage', () => {
  let component: CursoPage;
  let fixture: ComponentFixture<CursoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CursoPage],
      providers: [
        LocalApiService,
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

