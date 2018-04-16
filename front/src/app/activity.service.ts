import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import { IActivity, IIdea } from '../../../common/interface';
import { baseUrl } from './constants';

@Injectable()
export class ActivityService {
  constructor(private http: HttpClient) { }

  getActivities(autoRefresh: boolean = false): Observable<IActivity[]> {
    return autoRefresh
      ? Observable.timer(0, 5000).switchMapTo(
        this.http.get<IActivity[]>(baseUrl + 'activities')
      )
      : this.http.get<IActivity[]>(baseUrl + 'activities');
  }

  getIdeas(autoRefresh: boolean = false): Observable<IIdea[]> {
    return autoRefresh
      ? Observable.timer(0, 5000).switchMapTo(
        this.http.get<IActivity[]>(baseUrl + 'ideas')
      )
      : this.http.get<IActivity[]>(baseUrl + 'ideas');
  }
}
