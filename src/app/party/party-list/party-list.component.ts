import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Party } from 'src/app/core/models/party/party';
import { PartyService } from 'src/app/core/services/firestore/party.service';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit, OnDestroy {

  public partyList: Party[] = [];
  private subscription!: Subscription;
  public dataReady: boolean = false;
  constructor(private route: ActivatedRoute, private readonly partyService: PartyService) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // if (this.partyList[0]) {
    //   this.dataReady = true;
    // } else {
    //   // this.subscription = this.route.data.subscribe(data => {
    //   //   this.partyList = data['parties'];
    //   //   this.dataReady = true;
    //   // })
    // this.subscription = this.partyService.getPartyList().subscribe(v => {
    //   this.dataReady = true
    //   this.partyList = v
    // })
    // }
    this.subscription = this.partyService.getPartyList().subscribe(v => {
      this.dataReady = true
      this.partyList = v
    })
  }

}
