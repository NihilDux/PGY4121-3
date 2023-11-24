import { Component, OnInit } from '@angular/core';
import { curso } from 'src/models/curso';
import { alumnos } from 'src/models/alumnos';
import { LocalApiService } from 'src/services/localapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as QRCode from 'qrcode-generator';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage implements OnInit {
  curso: curso | undefined;
  alumnos: alumnos[] | undefined = [];
  profesorId: number = 1;
  cursoId: any;

  qrData: string = '';

  constructor(
    private localApiService: LocalApiService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private userService : UserService
  ) {
    this.activeroute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.profesorId = this.router.getCurrentNavigation()?.extras.state?.['idProfesor'];
        this.cursoId = this.router.getCurrentNavigation()?.extras.state?.['idCurso'];
      }
    });
  }

  generateQRCode(text: string): string {
    const typeNumber = 4;
    const errorCorrectionLevel = 'L';
    const qr = QRCode(typeNumber, errorCorrectionLevel);
    qr.addData(text);
    qr.make();
    return qr.createDataURL(10, 0);
  }

  async logout(){
    this.userService.logout();
  }
  async home(){
    this.router.navigate(['/home']);
  }
  
  QR() {
    if (this.curso) {
      const fechaActual = new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
  
      const qrText = `${this.curso.codigo}-${this.curso.seccion}-${fechaActual}`;
      this.qrData = this.generateQRCode(qrText);
    }
  }
  

  ngOnInit() {
    this.localApiService.getCursosPorProfesor(this.profesorId).subscribe(
      (data) => {
        this.curso = data.find((curso: curso) => curso.id === this.cursoId);
        this.alumnos = this.curso ? this.curso.alumnos : [];
        this.QR();
      },
      (error) => {
        console.error('Error obteniendo cursos:', error);
      }
    );
  }
}
