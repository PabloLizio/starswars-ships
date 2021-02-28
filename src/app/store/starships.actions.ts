import { Starship } from './../models/starship';
import { createAction, props } from '@ngrx/store';

export const loadNewPage = createAction(
  '[Ships Component] Load New Page',
  props<{ page: number }>()
);
export const pageLoaded = createAction(
  '[Ships Effects] New Page Loaded',
  props<{ ships: Starship[] }>()
);
