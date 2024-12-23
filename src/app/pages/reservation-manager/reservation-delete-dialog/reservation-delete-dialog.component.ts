import { Component, inject, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { ReservationService } from '../../../services/reservation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-reservation-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './reservation-delete-dialog.component.html',
  styleUrl: './reservation-delete-dialog.component.css'
})
export class ReservationDeleteDialogComponent {
 
  private readonly reservationService = inject(ReservationService); // Propiedad inyectada

  constructor(

    @Inject(MAT_DIALOG_DATA) private data: number,
    private _dialogRef: MatDialogRef<ReservationDeleteDialogComponent>,
    
  ){

  }


  confirmar(){ 
      this.reservationService.delete(this.data)
              .pipe(switchMap( (responseDelete:any) =>
                { 
                    return  this.reservationService.findAll();
                }))
              .subscribe(data => {
                this.reservationService.setReservationChange(data);
                this.reservationService.setMessageChange('DELETED!'); 
                this._dialogRef.close();
              });
  }

  cancel(){
    this._dialogRef.close();

  }

}
