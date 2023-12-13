import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalApiService } from 'src/services/localapi.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})
export class RestorePage implements OnInit {
  user: string = '';
  restoredata: any = {
    username: ''
  }

  constructor(
    private router: Router,
    private localApiService: LocalApiService,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  restoreUser() {
    if (!this.restoredata.username) {
      console.error('Ingrese un nombre de usuario.');
      return;
    }
    this.localApiService.getPassRestore(this.restoredata.username).subscribe(
      (response) => {
        this.presentToast('Contraseña del usuario: '+ response.password);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al obtener la contraseña:', error);
      }
    );
  }

  async inicio(){
    this.router.navigate(['/login']);
  }

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration ? duration : 4000,
    });
    toast.present();
  }
}
