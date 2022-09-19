import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import {  Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { DoctorRecordService } from 'src/app/services/doctor-record.service';
import { DoctorListComponent } from '../doctor-list/doctor-list.component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  @ViewChild('ch') ch: DoctorListComponent;
 
  constructor( private fb:FormBuilder, private service:DoctorRecordService ) { }
  queryString:string;
  keyWord:string;
  register!: FormGroup;
  searchForm!:FormGroup;
  
  emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  webPattern="(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
  ngOnInit(): void {

    this.register=this.fb.group({
      name:["", Validators.required],
      username:["", Validators.required ],
      email:["", [Validators.required,  Validators.pattern(this.emailPattern)]],
      phone:["", Validators.required],
      city:["", Validators.required ],
      website:["", [Validators.required, Validators.pattern(this.webPattern)]]
    })

    this.searchForm=this.fb.group({
      keyword:["", Validators.required]
    })
    
  }

public trimField(formGroup:FormGroup){
  Object.keys(formGroup.controls).forEach((key)=>{
    formGroup.get(key)?.setValue(formGroup.get(key)?.value.trim())
  })

}

  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
  }

  
  get m (){
    return this.register.controls
  }

  get s (){
    return this.searchForm.controls
  }
  
  onSubmit(): void{
    this.service.postDoctors(this.register.value).subscribe(res=>{
      if(this.register.valid){
         this.ch.doctors.push(res); 
         this.register.reset()
      }else{
       this.validateAllFormFields(this.register)
      }      
    })
  }

  numericalOnly(event:any){
    return (event.charCode == 8 || event.charCode == 0)? null : event.charCode >= 48 && event.charCode <= 57;
  }


  filter(){
  this.ch.doctors=this.ch.doctorList;
  this.keyWord=  this.keyWord.charAt(0).toUpperCase() + this.keyWord.slice(1)
  this.ch.doctors = this.ch.doctors.filter(doctor => { 
     return doctor.username.includes(this.keyWord) || doctor.name.includes(this.keyWord)
    
  })
  
  }
}
