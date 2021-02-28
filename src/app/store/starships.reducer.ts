import { Starship } from '@models/starship';
import { loadNewPage, pageLoaded } from './starships.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: Starship[] = [
  {
    name: '',
    url: '',
  },
];

const _starshipsReducer = createReducer(
  initialState,
  on(loadNewPage, (state) => state),
  on(pageLoaded, (state, { ships }) => ships)
);

export function starshipsReducer(
  state: Starship[] | undefined = initialState,
  action: Action
) {
  return _starshipsReducer(state, action);
}
