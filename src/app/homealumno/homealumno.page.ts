import { Component } from '@angular/core';
import { Camera, CameraResultType, Photo  } from '@capacitor/camera';
import JSQR from 'jsqr';

@Component({
  selector: 'app-homealumno',
  templateUrl: 'homealumno.page.html',
  styleUrls: ['homealumno.page.scss'],
})
export class HomealumnoPage {
  qrData: string = '';
  cameraResult: Photo | undefined; // Definir cameraResult a nivel de clase

  constructor() {}

  async scanQRCode() {
    const cameraResult = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Uri,
    });
  
    if (cameraResult.webPath) {
      this.decodeQRCode(cameraResult.webPath);
    } else {
      console.error('La propiedad webPath es indefinida.');
    }
  }
  

  async decodeQRCode(webPath: string | undefined) {
    if (!webPath) {
      console.error('La propiedad webPath es indefinida.');
      return;
    }
  
    try {
      const decodedData = await this.decodeDataUrl(webPath);
  
      // Obtén las dimensiones de la imagen
      const img = new Image();
      img.src = webPath;
      await img.decode();
      const width = img.width;
      const height = img.height;
  
      const qr = JSQR(decodedData, width, height);
  
      if (qr && qr.data) {
        this.qrData = qr.data;
        console.log('Datos decodificados:', this.qrData);
      } else {
        console.error('Error al decodificar el código QR.');
      }
    } catch (error) {
      console.error('Error al decodificar el código QR:', error);
    }
  }
  
  

  decodeDataUrl(dataUrl: string): Promise<Uint8ClampedArray> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        if (!ctx) {
          // Manejar el caso en el que getContext('2d') devuelve null
          reject(new Error('No se pudo obtener el contexto 2D del canvas.'));
          return;
        }
  
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        resolve(imageData.data);
      };
      img.onerror = (error) => reject(error);
      img.src = dataUrl;
    });
  }
  

  sendEmail() {
    const emailSubject = 'Asunto del correo';
    const emailBody = `Contenido del correo: ${this.qrData}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Abrir el cliente de correo del dispositivo
    window.location.href = mailtoLink;
  }
}
