import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPet: any;
  error: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) {}

  ngOnInit() {
    this.newPet = {
      name: "",
      type:"",
      desc: "",
      skill1:"",
      skill2: "",
      skill3:"",
      like: 0
        };
  }

  onSubmit(){
    console.log("in submit")
    let obs = this._httpService.createPet(this.newPet)
    obs.subscribe(data =>{
      console.log("within subscribe")
      if((data as any).message == "Error"){
        console.log("within error")
        console.log(this.error)
        this.error = data['error']
        console.log(this.error)
       }  
       else if ((data as any).message == "Unique Error"){
        this.error = data['error']
      }
     else{
       this._router.navigate([''])
     }
   })
   }

}
