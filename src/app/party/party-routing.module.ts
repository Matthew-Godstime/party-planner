import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/canActicate/auth.guard';
import { AuthChildGuard } from '../core/guard/canActivateChild/auth.guard';
import { PartyDetailsComponent } from './party-details/party-details.component';
import { PartyListComponent } from './party-list/party-list.component';
import { PartyRootComponent } from './party-root/party-root.component';
import { CreatePartyComponent } from './shared/create-party/create-party.component';
import { PartyResolverService } from './shared/services/party-resolver.service';

const routes: Routes = [
  {
    path: '', component: PartyRootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthChildGuard],
        children: [
          {
            path: '', component: PartyListComponent,
            resolve: {
              parties: PartyResolverService
            }
          },
          { path: 'new', component: CreatePartyComponent },
          { path: ':partyId', component: PartyDetailsComponent },
        ]
      }
      
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartyRoutingModule { }
