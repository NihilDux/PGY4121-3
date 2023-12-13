import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) }
  
  private apiUrl = 'http://127.0.0.1:5000'; // Ruta de la API

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.storage.create().then(() => {
      });
    });
  }

  async initializeStorage() {
    await this.platform.ready();
    await this.storage.create();
  }

  async getUserProfile(): Promise<number | null> {
  const user = await this.getCurrentUser();
  return user ? user.perfil : null;
}

  async login(username: string, password: string): Promise<boolean> {
    const data = { user: username, password };

    try {
      const response = await this.http.post<any>(`${this.apiUrl}/login`, data, this.httpOptions).toPromise();

      if (response.access_token !== null && response.access_token !== undefined) {
        await this.storage.set('access_token', response.access_token);
        return true;
      } else {
        console.error('El token de acceso no se encontró en la respuesta:', response);
        return false;
      }
      
    } catch (error) {
      console.error('Error en la autenticación:', error);
      return false;
    }
  }

  async logout() {
    await this.storage.remove('access_token');
    window.location.reload();
  }

  async getIsAuthenticated(): Promise<boolean> {
    const access_token = await this.storage.get('access_token');
    
    return access_token !== null;
  }
  
  async getCurrentUser(): Promise<any | null> {
    const access_token = await this.storage.get('access_token');
    if (access_token) {
      const decodedUser = await this.decodeJWT(access_token);
      return decodedUser || null;
    } else {
      return null;
    }
  }

  private decodeJWT(token: string): any | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error al decodificar el token JWT:', error);
      return null;
    }
  }
}
