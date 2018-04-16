import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { ActivityService } from "../activity.service";
import { IActivity } from "../../../../common/interface";

@Component({
  selector: "app-activities-page",
  templateUrl: "./activities-page.component.html",
  styleUrls: ["./activities-page.component.scss"],
  providers: [ActivityService],
})
export class ActivitiesPageComponent {
  public $activities: Observable<IActivity[]>;

  constructor(private activityService: ActivityService) {
    this.$activities = this.activityService.getActivities(true);
  }
}
