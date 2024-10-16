import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,  ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ReservationService } from '../service/reservation.service';
import { Reservation } from '../model/reservation';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { checkInDateValidator } from '../validators/checkIn.date';
import { CheckOutDateValidator } from '../validators/checkOut.date';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [ReactiveFormsModule, HomeComponent],
  providers: [DatePipe],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit{

  reservationForm: FormGroup =   this.fb.group({
    guestName: ['', [Validators.required, Validators.minLength(3)]],
    guestEmail: ['', [Validators.required, Validators.email]],
    checkInDate: [new Date(), [Validators.required, checkInDateValidator()]],
    checkOutDate: [new Date(), [Validators.required, CheckOutDateValidator()]],
    roomNumber: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder, 
    private reservationService: ReservationService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ){  
  }

  ngOnInit(): void {
   
   const id = this.activatedRoute.snapshot.paramMap.get('id');
   if(id){
    this.reservationService.getReservation(id).subscribe(reservation=>{
      if(reservation){
        reservation.checkInDate = this.datePipe.transform(reservation.checkInDate, 'yyyy-MM-dd') as any;
        reservation.checkOutDate = this.datePipe.transform(reservation.checkOutDate, 'yyyy-MM-dd') as any;
        this.reservationForm.patchValue(reservation)
      }
    })
   }
  }

  onSubmit(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const reservation = this.reservationForm.value;
    if(id){
      this.reservationService.updateReservation(id,reservation).subscribe(_=>{
        console.log('update reservation processed')
      })
    }else{
      this.reservationService.addReservation(reservation).subscribe(_=>{
        console.log('creating new reservation processed.')
      })
    }
    this.reservationForm.reset();
    this.router.navigate(["/list"]);
  }
}
