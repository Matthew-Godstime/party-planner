import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, DocumentReference, Firestore, runTransaction, Transaction } from '@angular/fire/firestore';
import { map, Observable, switchMap } from 'rxjs';
import { Party } from '../../models/party/party';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private partyCollection!: CollectionReference<DocumentData>;
  constructor(
    private readonly auth: AuthService,
    private readonly firestore: Firestore
  ) { }

  /**
   * createParty method create's a user party event
   */
  public createParty(party: Partial<Party>): Promise<DocumentReference> {
    const userId: string = this.auth.getUser()?.uid!;
    this.partyCollection = collection(this.firestore, `users/${userId}/party/`);
    return addDoc(this.partyCollection, party);
  }

  /**
   * getPartyList: returns the user's party list
   */
  public getPartyList(): Observable<Party[]> {
    return this.auth.getUser$().pipe(
      map(({ uid: userId }: any) =>
        collection(this.firestore, `users/${userId}/party/`)
      ),
      switchMap((partyCollection) =>
        collectionData(partyCollection, { idField: 'id' })
      )
    ) as Observable<Party[]>
  }

  /**
   * getPartyDetail returns the details of a party
   */
  public getPartyDetail(partyId: string): Observable<Party> {
    return this.auth.getUser$().pipe(
      map(({ uid: userId }: any) =>
        doc(this.firestore, `users/${userId}/party/${partyId}`)),
      switchMap(partyDocument => docData(partyDocument))
    ) as Observable<Party>
  }

  public async addTicketOperation(partyId: string, ticketCost: number, type: string = 'add'): Promise<void> {
    try {
      const userId: string = this.auth.getUser()!.uid;
      const partyDocRef = doc(this.firestore, `users/${userId}/party/${partyId}`);
      await runTransaction(this.firestore, async (transaction: Transaction) => {
        const partyDoc = await transaction.get(partyDocRef);
        const newRevenue = type === 'add' ?
          partyDoc.data()?.['revenue'] + ticketCost : partyDoc.data()?.['revenue'] - ticketCost;
        transaction.update(partyDocRef, { revenue: newRevenue });
      })
    } catch (error) {
      alert(error)
      throw error;
    }
  }

  public deleteParty(partyId: string) {
    const userId: string = this.auth.getUser()!.uid;
    const documentReference = doc(this.firestore, `users/${userId}/party/${partyId}`);
    return deleteDoc(documentReference);
  }

}
