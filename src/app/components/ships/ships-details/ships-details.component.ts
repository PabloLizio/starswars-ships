import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss'],
})
export class ShipsDetailsComponent implements OnInit {
  @Input() dataList: any;
  config: any;
  shipId: string = '';
  url: string = '';
  // Modal
  titleDetails: string = '';
  modelDetails: string = '';
  starship_class: string = '';

  constructor() {}

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.dataList.length,
    };
  }

  getStarshipId(url: string) {
    //extraer el ship ID de la url ej: "http://swapi.dev/api/starships/15/" -> "15"
    const shipId = url.replace(/(.+)([0-9]+)(.+)/g, '$2');
    return `https://starwars-visualguide.com/assets/img/starships/${shipId}.jpg`;
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  openDetails(details) {
    $('#exampleModal').modal('show');
    this.titleDetails = details.name;
    this.modelDetails = details.model;
    this.starship_class = details.starship_class;
  }
}
