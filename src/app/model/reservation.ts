import { Room } from "./room";

export class Reservation{
    idReservation!: number;
    customerName!: string;
    checkinDatePicker!: Date;
    checkoutDatePicker!: Date;
    checkinDate!: string|null;
    checkoutDate!: string|null;
    room!:Room;
}

/*{
    "idReservation": 1,
    "customerName": "esther",
    "checkinDate": "2024-12-04",
    "checkoutDate": "2024-12-05",
    "room": {
        "idRoom": 1,
        "number": "125",
        "type": "matrimonial",
        "price": 35.00,
        "available": true
    }*/