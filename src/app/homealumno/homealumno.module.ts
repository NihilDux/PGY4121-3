import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomealumnoPageRoutingModule } from './homealumno-routing.module';

import { QrComponent } from '../qr/qr.component';

import { HomealumnoPage } from './homealumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomealumnoPageRoutingModule
  ],
  declarations: [HomealumnoPage, QrComponent]
})
export class HomealumnoPageModule {}
