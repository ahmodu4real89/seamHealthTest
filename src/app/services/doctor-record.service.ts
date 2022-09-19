import { Injectable } from '@angular/core';
import { DoctorList } from '../model/doctor-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorRecordService {
apiUrl:string=`https://jsonplaceholder.typicode.com`
  constructor(private http: HttpClient) { }

 
  public getDoctors(){
    return this.http.get<DoctorList[]>(`${this.apiUrl}/users`);
}


public postDoctors(body:any){
  return this.http.post<DoctorList[]>(`${this.apiUrl}/users`, body);
}
}
