import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartyRoutingModule } from './party-routing.module';
import { PartyRootComponent } from './party-root/party-root.component';
import { PartyDetailsComponent } from './party-details/party-details.component';
import { PartyListComponent } from './party-list/party-list.component';
import { CreatePartyComponent } from './shared/create-party/create-party.component';


@NgModule({
  declarations: [
    PartyRootComponent,
    PartyDetailsComponent,
    PartyListComponent,
    CreatePartyComponent
  ],
  imports: [
    CommonModule,
    PartyRoutingModule
  ]
})
export class PartyModule { }
