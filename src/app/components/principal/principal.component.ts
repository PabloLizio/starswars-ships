import { StorageService } from '@services/storage/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  constructor(private authSotrage: StorageService) {}

  ngOnInit(): void {}

  logout() {
    this.authSotrage.logout();
  }
}
