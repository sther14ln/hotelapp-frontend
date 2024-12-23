import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from '../../model/reservation';
//import { RoomService } from '../../services/room.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ReservationService } from '../../services/reservation.service';
//import { RoomDialogComponent } from '../room-manager/room-dialog/room-dialog.component';
//import { Room } from '../../model/room';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import { RoomService } from '../../services/room.service';
import { ReservationDeleteDialogComponent } from './reservation-delete-dialog/reservation-delete-dialog.component';

@Component({
  selector: 'app-reservation-manager',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './reservation-manager.component.html',
  styleUrl: './reservation-manager.component.css'
})
export class ReservationManagerComponent implements OnInit{

  dataSource!: MatTableDataSource<Reservation>;
  //room!: Room[];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnsDefinitions = [
    { def: 'idReservation', label: 'idReservation', hide: true},
    { def: 'customerName', label: 'customerName', hide: false},
    { def: 'checkinDate', label: 'checkinDate', hide: false},    
    { def: 'checkoutDate', label: 'checkoutDate', hide: false},
    { def: 'room.number', label: 'number', hide: false},    
    { def: 'room.type', label: 'type', hide: false},
    { def: 'room.price', label: 'price', hide: false},    
    { def: 'room.available', label: 'available', hide: false},    
    { def: 'actions', label: 'actions', hide: false}
  ];

  constructor(
      private reservationService: ReservationService,
      private roomService: RoomService,
      private _dialog: MatDialog,
      private _snackBar: MatSnackBar
    ){}

    ngOnInit(): void {
      this.reservationService.findAll().subscribe(data => this.createTable(data));//this.roomService.findById()
      this.reservationService.getReservationChange().subscribe(data=>this.createTable(data));
      this.reservationService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 5000}));
  
    }

    createTable(data: Reservation[]){
      console.log(data)
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();    
  }

  getDisplayedColumns(){
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  openDialog(reservation?: Reservation){




        this.roomService.findAll().subscribe( 
          responseRooms=>{
              let data:any ={};
              data.reservation = reservation;
              data.rooms = responseRooms

            this._dialog.open(ReservationDialogComponent, {
              width: '750px',
              data: data
            }); 
          }
        )


     
    }

    cancelar(id: number){ 
     this._dialog.open(ReservationDeleteDialogComponent, {
        width: '200px',
        data: id
      }) 
    }

}
