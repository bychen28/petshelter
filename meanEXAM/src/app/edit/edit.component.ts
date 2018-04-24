import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
editPet = { name: "",type:"",desc: "",skill1:"",skill2: "",skill3:"",like: 0,_id: ""}
error: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    console.log(this._httpService.pet)
    this.editPet = this._httpService.pet
    console.log(this.editPet)
  }
  savePet(){
    let obs = this._httpService.savePet(this.editPet)
    console.log(this.editPet)
  	obs.subscribe(data => {
  		if((data as any).message == "Error"){
        console.log(data)
        this.error = data['error']
      }
  		else{
  			this._router.navigate(['/details/', this.editPet._id])
  		}
  	})
  }
}
