import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { IActivity, IIdea } from '../../../../common/interface';
import { ActivityMode } from '../activity-mode.enum';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {

  @HostBinding('class.card') isCard = true;
  @Input() activity: IActivity | IIdea;
  @Input() mode: ActivityMode;

  participating = false;
  voting = false;

  constructor() { }

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
    this.participating = !this.participating;
  }
}
