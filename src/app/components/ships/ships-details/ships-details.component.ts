import { Starship } from './../../../models/starship';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss'],
})
export class ShipsDetailsComponent implements OnInit {
  @Output() onOpenDetails = new EventEmitter<Starship>();
  @Input() starship: Starship;

  constructor() {}

  ngOnInit(): void {}

  getStarshipId(url: string) {
    //extraer el ship ID de la url ej: "http://swapi.dev/api/starships/15/" -> "15"
    const shipId = url.replace(/(.+[/])(\d+)([/])/g, '$2');
    return `https://starwars-visualguide.com/assets/img/starships/${shipId}.jpg`;
  }

  openDetails(selectedShip: Starship) {
    this.onOpenDetails.emit(selectedShip);
  }
}
