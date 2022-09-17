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
  searchForm!:FormGroup
  ngOnInit(): void {

    this.register=this.fb.group({
      name:["", Validators.required],
      username:["", Validators.required],
      email:["", [Validators.required,  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone:["", Validators.required],
      city:["", Validators.required],
      website:["", [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
    })

    this.searchForm=this.fb.group({
      keyword:["", Validators.required]
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
      }else{
       this.validateAllFormFields(this.register)

      }
      
    })
  
  }


  searchDoctors(){
    if(!this.keyWord.trim().length){
      return 
    }
    const firstCharacter = this.keyWord[0]
    let queryString = ''
    firstCharacter=='@' ? queryString = `username=${this.keyWord.substring(1)}`: queryString = `name=${this.keyWord}`
    this.service.searchDoctors(queryString).subscribe(res=>{
      
        this.ch.doctors=res
      
    })
  }
}
