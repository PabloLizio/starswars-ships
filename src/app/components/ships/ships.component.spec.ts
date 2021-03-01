import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ShipsService } from 'src/app/services/ships/ships.service';

import { ShipsComponent } from './ships.component';

import { BehaviorSubject, of } from 'rxjs';
import { PaginationControlsComponent } from 'ngx-pagination';
import { Component, Input, Pipe, PipeTransform } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StarshipsEffects } from 'src/app/store/starships.effects';
import { starshipsReducer } from 'src/app/store/starships.reducer';

describe('ShipsComponent', () => {
  let component: ShipsComponent;
  let fixture: ComponentFixture<ShipsComponent>;
  const serviceMock = {
    getShips: () => {
      return new BehaviorSubject([]);
    },
  };

  @Component({
    selector: 'pagination-controls',
    template: '<p>Mock Pagination controls Component</p>',
  })
  class MockPaginationControls {}
  @Pipe({ name: 'paginate' })
  class MockPipe implements PipeTransform {
    transform(value: number): number {
      // Do stuff here, if you want
      return value;
    }
  }

  @Component({
    selector: 'ships-details',
    template: '<p>Mock Ship Details</p>',
  })
  class MockShipDetails {
    @Input() dataList: any;
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ShipsComponent,
          MockShipDetails,
          MockPaginationControls,
          MockPipe,
        ],
        providers: [{ provide: ShipsService, useValue: serviceMock }],
        imports: [
          HttpClientModule,
          StoreModule.forRoot({ starships: starshipsReducer }),
          EffectsModule.forRoot([StarshipsEffects]),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
