import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Party } from 'src/app/core/models/party/party';
import { PartyService } from 'src/app/core/services/firestore/party.service';

@Component({
  selector: 'app-party-details',
  templateUrl: './party-details.component.html',
  styleUrls: ['./party-details.component.css']
})
export class PartyDetailsComponent implements OnInit {

  public currentParty!: Partial<Party>;
  public errorDetails!: Error;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly partyService: PartyService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('partyId')!;
    this.initializeParty(id);
  }

  private initializeParty(partyId: string): void {
    this.partyService.getPartyDetail(partyId).subscribe({
      next: (party: Party) => {
        this.currentParty = party;
        if (this.currentParty) {
          this.currentParty.id = partyId
          }
        },
        error: (error: Error) => {
          this.errorDetails = new Error(error.message);
          throw error
        },
      })
  }

  public async addTicketOperation(type: string): Promise<void> {
    try {
      await this.partyService.addTicketOperation(this.currentParty.id!, this.currentParty.ticketPrice!, type);
    } catch (error) {
      console.log(error);
    }
  }

  public removeParty(): void {
    const ans = confirm(`Are you sure you want to delete ${this.currentParty.eventName}`)
    if (ans) {
      this.partyService.deleteParty(this.currentParty.id!).then(() => {
        this.router.navigateByUrl('party');
      }).catch(error => {
        alert(error.message)
      })
    } else {
      return
    }
  }

}
