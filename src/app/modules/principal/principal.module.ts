import { ShipsCacheInterceptor } from '../../services/ships/ships-cache.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrincipalComponentsRoutingModule } from './principal-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
// Components
import { ShipsComponent } from '../../components/ships/ships.component';
import { ShipsDetailsComponent } from '../../components/ships/ships-details/ships-details.component';

@NgModule({
  declarations: [ShipsComponent, ShipsDetailsComponent],
  imports: [
    CommonModule,
    PrincipalComponentsRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ShipsCacheInterceptor,
      multi: true,
    },
  ],
})
export class PrincipalModule {}
