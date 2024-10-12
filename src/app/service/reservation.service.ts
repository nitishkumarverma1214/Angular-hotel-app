import { Injectable, OnInit } from '@angular/core';
import { Reservation } from '../model/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservations: Reservation[] = [];

  constructor() {
    const reservations = localStorage.getItem('reservations');
    this.reservations = reservations ? JSON.parse(reservations) as Reservation[] : []
   }

   // CRUD

  getReservations(): Reservation[]{
    
    return this.reservations;
  }
  getReservation(id: string): Reservation | undefined{
    
    return this.reservations.find(res=> res.id === id)
  }

  addReservation(reservation: Reservation){
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    this.updateInLocalStorage();
  }

  updateReservation(id: string, updatedReservation: Reservation){
    const index = this.reservations.findIndex(res=> res.id === id);
    if(index !== -1){
      this.reservations[index] = updatedReservation;
      this.updateInLocalStorage();
    }
  }

  deleteReservation(id: string){
    const index = this.reservations.findIndex(res=> res.id === id);
    this.reservations.splice(index,1);
    this.updateInLocalStorage();
  }


  // localstorage
  private updateInLocalStorage(): void{
    localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }


}
