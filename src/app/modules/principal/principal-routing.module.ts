import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipsComponent } from '../../components/ships/ships.component';
import { PrincipalComponent } from '../../components/principal/principal.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [{ path: 'ships', component: ShipsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalComponentsRoutingModule {}
