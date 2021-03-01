import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PrincipalModule } from './modules/principal/principal.module';

// Components
import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/principal/principal.component';

// Store
import { StarshipsEffects } from './store/starships.effects';
import { StoreModule } from '@ngrx/store';
import { starshipsReducer } from './store/starships.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@NgModule({
  declarations: [AppComponent, PrincipalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrincipalModule,
    AuthenticationModule,
    StoreModule.forRoot({ starships: starshipsReducer }),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([StarshipsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
