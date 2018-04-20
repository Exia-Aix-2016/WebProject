import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivityService } from '../activity.service';
import { ActivitiesListMode } from '../activities-list-mode.enum';
import { ActivityMode } from '../activity-mode.enum';
import { Activity } from '../activity';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss'],
})
export class ActivitiesListComponent implements OnInit {

  @HostBinding('class.card-deck') isCardDeck = true;
  @Input() mode: ActivitiesListMode;

  public $activities: Observable<Activity[]>;

  constructor(private activityService: ActivityService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.connection.subscribe(user => {
      if (user) {
        switch (this.mode) {
          case ActivitiesListMode.ALL:
            break;
          case ActivitiesListMode.IDEAS:
            this.$activities = this.activityService.getIdeas();
            break;
          case ActivitiesListMode.ACTIVITIES:
            this.$activities = this.activityService.getActivities();
            break;
        }
      }
    });

  }

  public get activityMode(): ActivityMode {
    switch (this.mode) {
      case ActivitiesListMode.IDEAS:
        return ActivityMode.COMPACT;
      case ActivitiesListMode.ACTIVITIES:
        return ActivityMode.FULL;
    }
  }

}
