import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  pet: any
  constructor(private _http: HttpClient){}
  getPets(){
    return this._http.get('/home')
  }
  createPet(newPet){
    return this._http.post('/pets/new', newPet)
  }
  showPet(pet){
    //User Sets This Pet by clicking from the previous component obj and we use the Servive to store it
    this.pet = pet
  }
  savePet(editPet){
    this.pet = editPet
    return this._http.put('/pets/' + this.pet._id, this.pet)
  }
  getPetByID(pet){
    return this._http.get('/pets/' + this.pet._id, this.pet)
  }
  likePet(pet){
    return this._http.put('/pets/up/' + pet._id,this.pet)
  }
  deletePet(pet){
    return this._http.delete('/pets/' + this.pet._id, this.pet)
  }
}
