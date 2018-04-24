import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pet: any;
  clicked = false 
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) { }

  ngOnInit() {
    this.pet = this._httpService.pet;
    let obs = this._httpService.getPetByID(this.pet);
    obs.subscribe(data => {
      console.log(this.pet)
      this.pet = data["data"]
    })
  }

likePet(pet){
  let obs = this._httpService.likePet(this.pet);
  console.log(this.pet)
  obs.subscribe(data =>{
    console.log(data)
    if(data["message"] == "Success"){
      this.clicked = true;
      this.ngOnInit()
    }
  })
}
deletePet(pet){
  let obs = this._httpService.deletePet(pet)
  obs.subscribe(data => {
    this._router.navigate(['/'])
  })
  }
}

