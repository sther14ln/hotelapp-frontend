import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Room } from '../model/room';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends GenericService<Room> {

   private roomChange: Subject<Room[]> = new Subject<Room[]>;
  private messageChange: Subject<string> = new Subject<string>; 

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/rooms`)
  }

   setRoomChange(data: Room[]){
    this.roomChange.next(data);
  }

  getRoomChange(){
    return this.roomChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
