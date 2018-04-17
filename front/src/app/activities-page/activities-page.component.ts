import { Component } from '@angular/core';
import { ActivitiesListMode } from '../activities-list-mode.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.scss'],
})
export class ActivitiesPageComponent {

  public listMode = ActivitiesListMode.ACTIVITIES;

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(segments => {
      const path = segments.join('');
      if (path.includes('activities')) {
        this.listMode = ActivitiesListMode.ACTIVITIES;
      } else if (path.includes('ideas')) {
        this.listMode = ActivitiesListMode.IDEAS;
      }
    });
  }
}
