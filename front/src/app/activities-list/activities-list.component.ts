import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivityService } from '../activity.service';
import { IIdea, IActivity } from '../../../../common/interface';
import { ActivitiesListMode } from '../activities-list-mode.enum';
import { ActivityMode } from '../activity-mode.enum';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss'],
  providers: [ActivityService],
})
export class ActivitiesListComponent implements OnInit {

  @HostBinding('class.card-deck') isCardDeck = true;
  @Input() mode: ActivitiesListMode;

  public $activities: Observable<IIdea[] | IActivity[]>;

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    switch (this.mode) {
      case ActivitiesListMode.ALL:
        break;
      case ActivitiesListMode.IDEAS:
        this.$activities = this.activityService.getIdeas(false);
        break;
      case ActivitiesListMode.ACTIVITIES:
        this.$activities = this.activityService.getActivities(false);
        break;
    }
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
