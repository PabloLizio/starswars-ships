import { ShipsService } from '@services/ships/ships.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { loadNewPage, pageLoaded } from './starships.actions';

@Injectable()
export class StarshipsEffects {
  loadPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNewPage),
      mergeMap((action) => {
        return this.shipsService
          .getShips(action.page)
          .pipe(map((starships) => pageLoaded({ ships: starships.results })));
      })
    )
  );

  constructor(private actions$: Actions, private shipsService: ShipsService) {}
}
