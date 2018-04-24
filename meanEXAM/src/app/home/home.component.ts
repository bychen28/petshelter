import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets = []
  pet = {} 
  constructor(private _httpService: HttpService,private _router: Router,private _route: ActivatedRoute){}

  ngOnInit() {
    this.getPets()
  }
  getPets(){
    let obs = this._httpService.getPets()
    obs.subscribe(data => {
      console.log(data)
      this.pets = data["data"]
      console.log(data["data"])
      this.pets.sort(function(a,b){
        if(a.type < b.type){
          return -1;
        }
        if (a.type > b.type){
          return 1;
        }
        return 0
      })
      if((data as any).message != "Success"){
        console.log("Did not get pets")
      }
      else{
        this.pets = (data as any).data
      }
    })
  }
showPet(pet){
  this._httpService.showPet(pet)
}
}

