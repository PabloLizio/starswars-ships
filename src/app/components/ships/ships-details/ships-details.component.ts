import { Starship } from '@models/starship';
import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss'],
})
export class ShipsDetailsComponent implements OnInit {
  @Input() starship: Starship;

  // Modal
  titleDetails: string = '';
  modelDetails: string = '';
  starship_class: string = '';

  constructor() {}

  ngOnInit(): void {}

  getStarshipId(url: string) {
    //extraer el ship ID de la url ej: "http://swapi.dev/api/starships/15/" -> "15"
    const shipId = url.replace(/(.+[/])(\d+)([/])/g, '$2');
    return `https://starwars-visualguide.com/assets/img/starships/${shipId}.jpg`;
  }

  openDetails(details) {
    $('#exampleModal').modal('show');
    this.titleDetails = details.name;
    this.modelDetails = details.model;
    this.starship_class = details.starship_class;
  }
}
