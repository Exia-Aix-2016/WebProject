import { Component, OnInit, Input } from "@angular/core";
import { IActivity } from "../../../../common/interface";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"],
})
export class ActivityComponent implements OnInit {
  @Input() activity: IActivity;
  @Input() isIdea = false;

  constructor() {}

  ngOnInit() {}
}
