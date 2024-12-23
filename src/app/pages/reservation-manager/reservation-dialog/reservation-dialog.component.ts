import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reservation } from '../../../model/reservation';
import { ReservationService } from '../../../services/reservation.service';
import { switchMap } from 'rxjs';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule } from '@angular/forms';
import { Room } from '../../../model/room';
import { RoomService } from '../../../services/room.service';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';
import { parse, formatISO } from 'date-fns';


@Component({
  selector: 'app-reservation-dialog',
  standalone: true,
  imports: [MaterialModule, FormsModule,CommonModule],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.css'
})
export class ReservationDialogComponent implements OnInit{

  reservation! : Reservation;
  rooms:Room[]= [];

  minDate: Date = new Date();

  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      private _dialogRef: MatDialogRef<ReservationDialogComponent>,
      private reservationService: ReservationService,
      private roomService: RoomService
    ){}
  
    ngOnInit(): void {

      console.log(this.data)
      this.reservation = {... this.data.reservation}  
      this.rooms=  this.data.rooms



      if(this.reservation.checkinDate!=null){
        this.reservation.checkinDate = this.reservation.checkinDate
        ? formatISO(parse(this.reservation.checkinDate, "yyyy-MM-dd", new Date()))
        : null;
      }

      if(this.reservation.checkoutDate!=null){
        this.reservation.checkoutDate = this.reservation.checkoutDate
        ? formatISO(parse(this.reservation.checkoutDate, "yyyy-MM-dd", new Date()))
        : null;
      }

    /*   this.roomService.findAll().subscribe(response=>
      {
       
      }
       );
 */
      

       

  }
  
  close(){
    this._dialogRef.close();
  }
  
  compareRooms = (room1: any, room2: any): boolean => {
    return room1 && room2 ? room1.type === room2.type && room1.number === room2.number : room1 === room2;
};

  operate(){
    if(this.reservation != null && this.reservation.idReservation > 0){
      this.reservation.checkinDate = (this.reservation.checkinDate!=null && this.reservation.checkinDate!=undefined)?format(this.reservation.checkinDate,"yyyy-MM-dd"):null;
      this.reservation.checkoutDate = (this.reservation.checkoutDate!=null && this.reservation.checkoutDate!=undefined)?format(this.reservation.checkoutDate,"yyyy-MM-dd"):null;
      //UPDATE
      console.log(this.reservation)
      this.reservationService.update(this.reservation.idReservation, this.reservation)
        .pipe(switchMap( () => this.reservationService.findAll()))
        .subscribe(data => {
          this.reservationService.setReservationChange(data);
          this.reservationService.setMessageChange('UPDATED!');
          
        });
    }else{
      //INSERT
        this.reservation.checkinDate = (this.reservation.checkinDate!=null && this.reservation.checkinDate!=undefined)?format(this.reservation.checkinDate,"yyyy-MM-dd"):null;
        this.reservation.checkoutDate = (this.reservation.checkoutDate!=null && this.reservation.checkoutDate!=undefined)?format(this.reservation.checkoutDate,"yyyy-MM-dd"):null;
        console.log(this.reservation)
        this.reservationService.save(this.reservation)
      .pipe(switchMap( () => this.reservationService.findAll()))
      .subscribe(data => {
        this.reservationService.setReservationChange(data);
        this.reservationService.setMessageChange('CREATED!');
        
      });
    }
  
    this.close();
  }

  getDate(e: any){
    console.log(e);
  }


}
