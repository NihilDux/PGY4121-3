import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { alumnos } from 'src/models/alumnos';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalApiService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) }

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getProfesores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/profesores', this.httpOptions);
  }
  
  getIdProfesor(user: string): Observable<any> {
    const data = { user: user };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/buscar_profesor`, data, { headers: headers });
  }

  getCursosPorProfesor(profesorId: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/profesores/' + profesorId + '/cursos', this.httpOptions).pipe(
      catchError((error) => {
        console.error('Error al obtener los cursos:', error);
        if (error.status === 404) {
          console.log('No tiene cursos');
        }
        throw error;
      })
    );
  }
  getAlumnosPorCurso(profesorId: number, cursoId: number){
    return this.http.get<alumnos[]>(this.apiUrl+'/profesores/'+profesorId+'/cursos/'+cursoId+'/alumnos', this.httpOptions);

  }

  async getProfesorIdPorUsuario(user: string) {
    const usuarioBuscado = user;
  
    const data = { username: usuarioBuscado };
  
    try {
      const response = await this.http.post<any>(this.apiUrl+'/buscar_profesor', data).toPromise();
  
      if (response.id) {
        const profesorId = response.id;

        return profesorId;
      } else {
        console.log('Profesor no encontrado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  async getDataUser(user: string) {
    const data = { user };
    try {      
      return await this.http.post<any>(this.apiUrl+'/usuario', data).toPromise();
      
    } catch (error) {
      console.error('Error en la solicitud para obtener el usuario:', error);
      throw error;
    } 
  }
  
}
