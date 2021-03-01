import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(`./modules/authentication/authentication.module`).then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'principal',
    loadChildren: () =>
      import(`./modules/principal/principal.module`).then(
        (m) => m.PrincipalModule
      ),
    canActivate: [AuthenticatedGuard],
  },
  { path: '**', redirectTo: 'principal/ships', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
