import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ActivityService } from "../activity.service";
import { IActivity } from "../../../../common/interface";

@Component({
  selector: "app-activities-page",
  templateUrl: "./activities-page.component.html",
  styleUrls: ["./activities-page.component.scss"],
  providers: [ActivityService],
})
export class ActivitiesPageComponent implements OnInit {
  public $activities: Observable<IActivity[]>;

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.$activities = this.activityService.getAll();
  }
}
