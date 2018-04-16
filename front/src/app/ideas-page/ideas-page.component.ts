import { Component } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ActivityService } from '../activity.service';
import { IIdea } from '../../../../common/interface';

@Component({
  selector: 'app-ideas-page',
  templateUrl: './ideas-page.component.html',
  styleUrls: ['./ideas-page.component.scss'],
  providers: [ActivityService],
})
export class IdeasPageComponent {
  public $activities: Observable<IIdea[]>;

  constructor(private activityService: ActivityService) {
    this.$activities = this.activityService.getIdeas(false);
  }
}
