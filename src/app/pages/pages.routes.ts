import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RoomManagerComponent } from "./room-manager/room-manager.component";
import { ReservationManagerComponent } from "./reservation-manager/reservation-manager.component";

export const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    
    { path: 'room', component: RoomManagerComponent},
    { path: 'reservation', component: ReservationManagerComponent}
]