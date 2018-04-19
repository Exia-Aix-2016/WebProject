import { Component, OnInit, Input, HostBinding, TemplateRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ActivityMode } from '../activity-mode.enum';
import { ActivityService } from '../activity.service';
import { Activity } from '../activity';
import { baseUrl } from '../constants';

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

  constructor(private activityService: ActivityService, private modalService: BsModalService, private router: Router) { }

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

  toggleVote(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.activityService.setVote(this.activity.id, !this.activity.voting).subscribe({
      error: e => console.error(e)
    });
  }

  toggleParticipation(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.activityService.setParticipation(this.activity.id, !this.activity.participating).subscribe({
      error: e => console.error(e)
    });
  }

  @HostListener('click')
  public openSocial() {
    if (this.mode === ActivityMode.FULL) {
      this.router.navigateByUrl('/activities/' + this.activity.id);
    }
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
