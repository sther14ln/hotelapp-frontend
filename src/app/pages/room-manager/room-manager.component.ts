import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RoomService } from '../../services/room.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Room } from '../../model/room';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RoomDialogComponent } from './room-dialog/room-dialog.component';

@Component({
  selector: 'app-room-manager',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './room-manager.component.html',
  styleUrl: './room-manager.component.css'
})
export class RoomManagerComponent implements OnInit {

  dataSource!: MatTableDataSource<Room>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnsDefinitions = [
    { def: 'idRoom', label: 'idRoom', hide: true},
    { def: 'number', label: 'number', hide: false},
    { def: 'type', label: 'type', hide: false},    
    { def: 'price', label: 'price', hide: false},    
    { def: 'available', label: 'available', hide: false},    
    { def: 'actions', label: 'actions', hide: false}
  ];

  constructor(
    private roomService: RoomService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}


  ngOnInit(): void {
    this.roomService.findAll().subscribe(data => this.createTable(data));
    this.roomService.getRoomChange().subscribe(data=>this.createTable(data));
    this.roomService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 5000}));

  }

  createTable(data: Room[]){
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

  openDialog(room?: Room){
     this._dialog.open(RoomDialogComponent, {
      width: '750px',
      data: room
    }); 
  }

  
  delete(id: number){
    /* this._dialog.open(MedicDeleteDialogComponent, {
      width: '200px',
      data: id
    }) */
  }

}
