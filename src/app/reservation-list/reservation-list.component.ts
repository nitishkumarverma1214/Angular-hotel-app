import { Component, OnInit } from '@angular/core';
import { Reservation } from '../model/reservation';
import { ReservationService } from '../service/reservation.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [DatePipe, RouterLink, HomeComponent],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit{
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService){}
  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations();
  }

  deleteReservation(id: string){
    this.reservationService.deleteReservation(id);
  }


  
}

