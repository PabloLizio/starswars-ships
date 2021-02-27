import { Component, OnInit } from '@angular/core';
import { ShipsService } from 'src/app/services/ships/ships.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit {
  public dataList: any = [];
  config: any;

  constructor(private shipsService: ShipsService) {}

  ngOnInit(): void {
    this.getShips(1);
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 36,
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
    this.getShips(event);
  }

  getShips(page: number) {
    this.shipsService.getShips(page).subscribe((ships) => {
      this.dataList = ships;
      console.log('SHIPS -->', this.dataList.results);
    });
  }
}
