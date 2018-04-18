import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/do';
import { IActivity, IIdea } from '../../../common/interface';
import { CreateActivityDto, CreateIdeaDto, EditActivityDto } from '../../../common/dto/';
import { baseUrl } from './constants';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Activity } from './activity';

@Injectable()
export class ActivityService {
  private $update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor(private http: HttpClient) { }

  getActivities(): Observable<Activity[]> {
    return this.$update.switchMapTo(
      this.http.get<IActivity[]>(baseUrl + 'activities').flatMap(activities => {
        return Observable.forkJoin(
          activities.map(activity =>
            this.http
              .get<{ value: boolean }>(
                baseUrl + 'activities/' + activity.id + '/participate'
              )
              .map(p => {
                return { ...activity, participating: p.value };
              })
          )
        );
      })
    );
  }

  createIdea(createIdeaDto: CreateIdeaDto): Observable<Activity> {
    return this.http.post<IIdea>(baseUrl + 'ideas', createIdeaDto)
      .do(v => this.$update.next(true));
  }

  createActivity(createActivityDto: CreateActivityDto): Observable<Activity> {
    return this.http.post<IActivity>(baseUrl + 'activities', createActivityDto)
      .do(v => this.$update.next(true));
  }

  getIdeas(): Observable<Activity[]> {
    return this.$update.switchMapTo(this.http.get<IIdea[]>(baseUrl + 'ideas'));
  }

  setParticipation(activityId: number, value: boolean) {
    const url = baseUrl + 'activities/' + activityId + '/participate';
    return this.http.put(url, { value }).do(() => this.$update.next(true));
  }

  getOccurrences() {
    return this.http.get<string[]>(baseUrl + 'activities/occurrences');
  }

  deleteActivity(activityId: number) {
    return this.http.delete<void>(baseUrl + 'activities/' + activityId)
      .do(v => this.$update.next(true));
  }

  deleteIdea(activityId: number) {
    return this.http.delete<void>(baseUrl + 'ideas/' + activityId)
      .do(v => this.$update.next(true));
  }

  signal(activityId: number, activity: boolean, value: boolean) {
    return this.http.put<void>(baseUrl + (activity ? 'activities/' : 'ideas/') + activityId + '/signal', { value })
      .do(v => this.$update.next(true));
  }

  edit(editActivityDto: EditActivityDto) {
    return this.http.put<void>(`${baseUrl}activities/${editActivityDto.id}`, editActivityDto)
      .do(v => this.$update.next(true));
  }
}
