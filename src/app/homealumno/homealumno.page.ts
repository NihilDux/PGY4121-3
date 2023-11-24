import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocalApiService } from 'src/services/localapi.service';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from "@angular/router";
import { UserService } from 'src/services/user.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-homealumno',
  templateUrl: 'homealumno.page.html',
  styleUrls: ['homealumno.page.scss'],
})
export class HomealumnoPage {
  @ViewChild('titulo', { read: ElementRef }) titulo: ElementRef;
  user : any;
  dataUser: any;

  constructor(
    private router: Router,
    private userService : UserService,
    private localApiService : LocalApiService,
    private platform : Platform,
    private storage : Storage,

  ) {
    this.titulo = ElementRef.prototype as any;
    this.platform.ready().then(() => {
      this.storage.create();
    });
  }

  async initializeStorage() {
    await this.platform.ready();
    await this.storage.create();
  }

  async ngOnInit() {
    await this.initializeStorage();
    const isAuthenticated = await this.userService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }

    this.user = await this.userService.getCurrentUser();
    this.dataUser = await this.localApiService.getDataUser(this.user.username);


    
  }

  async logout(){
    this.userService.logout();
  }

}
