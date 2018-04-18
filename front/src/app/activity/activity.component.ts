import { Component, OnInit, Input, HostBinding, TemplateRef } from '@angular/core';
import { ActivityMode } from '../activity-mode.enum';
import { ActivityService } from '../activity.service';
import { Activity } from '../activity';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {

  @HostBinding('class.card') isCard = true;
  @Input() activity: Activity;
  @Input() mode: ActivityMode;

  modalRef: BsModalRef;
  voting = false;

  constructor(private activityService: ActivityService, private modalService: BsModalService) { }

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

  get signaled(): boolean {
    return this.activity.signaled ? true : false;
  }

  toggleVote() {
    this.voting = !this.voting;
  }

  toggleParticipation() {
    this.activityService.setParticipation(this.activity.id, !this.activity.participating).subscribe({
      error: e => console.error(e)
    });
  }

  edit(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  delete() {
    const delete$ = this.activity.planned
      ? this.activityService.deleteActivity(this.activity.id)
      : this.activityService.deleteIdea(this.activity.id);

    delete$.subscribe({ error: e => console.error(e) });
  }

  report() {
    this.activityService.signal(this.activity.id, this.activity.planned, !this.activity.signaled)
      .subscribe({
        error: e => console.error(e)
      });
  }
}
