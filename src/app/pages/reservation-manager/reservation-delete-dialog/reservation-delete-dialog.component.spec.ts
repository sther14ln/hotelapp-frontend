import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDeleteDialogComponent } from './reservation-delete-dialog.component';

describe('ReservationDeleteDialogComponent', () => {
  let component: ReservationDeleteDialogComponent;
  let fixture: ComponentFixture<ReservationDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
