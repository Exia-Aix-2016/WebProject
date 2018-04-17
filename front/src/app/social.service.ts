import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/do';
import { Picture } from './picture';
import { IPicture } from '../../../common/interface';

@Injectable()
export class SocialService {

  constructor(private http: HttpClient) { }

  getPictures(activityId: number): Observable<Picture[]> {
    return this.http.get<IPicture[]>("/activities/" + activityId + "/pictures");
  }


}