import { Component, OnInit } from '@angular/core';

import { StarshipState } from '@models/starships.state';
import { Starship } from '@models/starship';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadNewPage } from '@store/starships.actions';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit {
  starShipsList$: Observable<Starship[]>;
  config: any;

  constructor(private store: Store<StarshipState>) {
    this.starShipsList$ = this.store.select('starships');
  }

  ngOnInit(): void {
    this.store.dispatch(loadNewPage({ page: 1 }));
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 36,
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
    this.store.dispatch(loadNewPage({ page: event }));
  }
}
