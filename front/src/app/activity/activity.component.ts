import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivityMode } from '../activity-mode.enum';
import { ActivityService } from '../activity.service';
import { Activity } from '../activity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {

  @HostBinding('class.card') isCard = true;
  @Input() activity: Activity;
  @Input() mode: ActivityMode;

  voting = false;

  constructor(private activityService: ActivityService) { }

  ngOnInit() { }

  get displayDate(): boolean {
    return this.mode === ActivityMode.FULL;
  }

  get displayParticipation(): boolean {
    return this.mode === ActivityMode.FULL;
  }

  get displayVote(): boolean {
    return this.mode === ActivityMode.COMPACT;
  }

  toggleVote() {
    this.voting = !this.voting;
  }

  toggleParticipation() {
    this.activityService.setParticipation(this.activity.id, !this.activity.participating).subscribe({
      error: e => console.error(e)
    });
  }
}
