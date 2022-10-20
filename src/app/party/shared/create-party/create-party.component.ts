import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartyService } from 'src/app/core/services/firestore/party.service';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.css']
})
export class CreatePartyComponent implements OnInit {

  public partyForm!: FormGroup
  constructor(private fb: FormBuilder, private router: Router, private readonly partyService: PartyService) { }

  ngOnInit(): void {
    this.partyForm = this.fb.group({
      eventName: ['', [Validators.required]],
      ticketPrice: [ , Validators.required],
      cost: [ , Validators.required],
      date: [ , Validators.required]
    })
  }
  
  /**
   * onSubmit
   */
  public createEvent() {
    let partyModel = this.partyForm.value;
    partyModel.revenue = 0;
    this.partyService.createParty(partyModel);
    this.router.navigateByUrl('');
  }

}
