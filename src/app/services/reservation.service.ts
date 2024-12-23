import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Reservation } from '../model/reservation';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends GenericService<Reservation>{

  private reservationChange: Subject<Reservation[]> = new Subject<Reservation[]>;
    private messageChange: Subject<string> = new Subject<string>; 
  
    constructor(protected override http: HttpClient) {
      super(http, `${environment.HOST}/reservations`)
    }
  
     setReservationChange(data: Reservation[]){
      this.reservationChange.next(data);
    }
  
    getReservationChange(){
      return this.reservationChange.asObservable();
    }
  
    setMessageChange(data: string){
      this.messageChange.next(data);
    }
  
    getMessageChange(){
      return this.messageChange.asObservable();
    }
}
