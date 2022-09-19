import { Component, OnInit } from '@angular/core';
import { DoctorRecordService } from './../../services/doctor-record.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctors:any[]=[];
  doctorList:any[];
  constructor(private service:DoctorRecordService) { }

  ngOnInit(): void {
    
    
    this.service.getDoctors().subscribe(res=>{
      console.log(res, "result")
     this.doctors=res;
     this.doctorList=res
    })

  }

}
