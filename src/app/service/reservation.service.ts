import { Injectable, OnInit } from '@angular/core';
import { Reservation } from '../model/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 const BACKEND_URL = `http://localhost:3000`

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservations: Reservation[] = [];

  constructor(private httpClient: HttpClient) {}

   // CRUD

  getReservations(): Observable<Reservation[]>{
    
    return this.httpClient.get<Reservation[]>(`${BACKEND_URL}/reservations`);
  }
  getReservation(id: string): Observable<Reservation> {
    
    return this.httpClient.get<Reservation>(`${BACKEND_URL}/reservations/${id}`);
  }

  addReservation(reservation: Reservation){
    return this.httpClient.post<Reservation>(`${BACKEND_URL}/reservations`, reservation);
  }

  updateReservation(id: string, updatedReservation: Reservation){
    return this.httpClient.put<Reservation>(`${BACKEND_URL}/reservations/${id}`, updatedReservation);
  }

  deleteReservation(id: string){
    return this.httpClient.delete<Reservation>(`${BACKEND_URL}/reservations/${id}`);
  }


  // localstorage
  private updateInLocalStorage(): void{
    localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }


}
