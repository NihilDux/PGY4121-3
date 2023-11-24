import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomealumnoPage } from './homealumno.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
describe('HomealumnoPage', () => {
  let component: HomealumnoPage;
  let fixture: ComponentFixture<HomealumnoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomealumnoPage],
      imports: [IonicModule.forRoot(),
                HttpClientTestingModule,
                IonicStorageModule.forRoot() ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomealumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Agrega más pruebas según sea necesario para cubrir tus funciones y casos de uso.
});
