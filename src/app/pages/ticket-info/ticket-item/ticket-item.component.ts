import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ITour from 'src/app/models/ITour';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket:ITour | undefined;
  constructor(
    private router: ActivatedRoute,
    private ticketStorage:TiсketsStorageService
  ) { }

  ngOnInit(): void {
    const id =this.router.snapshot.paramMap.get('id');
    if (id){
      this.ticket = this.ticketStorage.getStorage().find(item=>item.id === id);
    }
    console.log(id,this.ticket);
  }

}
