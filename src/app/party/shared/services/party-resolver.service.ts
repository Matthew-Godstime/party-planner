import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, mergeMap, Observable, of, take } from 'rxjs';
import { Party } from 'src/app/core/models/party/party';
import { PartyService } from 'src/app/core/services/firestore/party.service';

@Injectable({
  providedIn: 'root'
})
export class PartyResolverService implements Resolve<Partial<Party[]>>{

  constructor(private readonly partyService: PartyService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Partial<Party[]>> | Observable<never> {
    return this.partyService.getPartyList().pipe(
      take(1),
      mergeMap(parties => {
        if (parties) {
          return of(parties)
        } else {
          // this.router.navigate(['/crisis-center']);
          return EMPTY;
        }
      })
    )
    
  }
}
