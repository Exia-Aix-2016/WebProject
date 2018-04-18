import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/do';
import { IPicture, IPictureExtended, IComment, IUser } from '../../../common/interface';
import { baseUrl } from './constants';
import { CommentDto } from '../../../common/dto';

@Injectable()
export class SocialService {

  private $update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) { }

  public getExtendedPictures(activityId: number): Observable<IPictureExtended[]> {
    return this.$update
      .switchMapTo(this.getPictures(activityId))
      .flatMap(pictures => Observable.forkJoin(pictures.map(
        picture => this.getComments(picture)
          .flatMap(comments => {
            return comments.length > 0 ? Observable.forkJoin(
              comments.map(comment =>
                this.getCommentUser(comment).map(user => {
                  return { ...comment, user };
                })
              )
            ) : Observable.of([]);
          })
          .map(comments => {
            return { ...picture, comments };
          })

      )));
  }

  public getCommentUser(comment: IComment) {
    return this.http.get<IUser>(baseUrl + 'users/' + comment.userId);
  }

  public getPictures(activityId: number): Observable<IPicture[]> {
    return this.http.get<IPicture[]>(baseUrl + "activities/" + activityId + "/pictures");
  }

  public getComments(picture: IPicture): Observable<IComment[]> {
    return this.http.get<IComment[]>(baseUrl + "pictures/" + picture.id + "/comments");
  }



  public updateComment(comment: IComment, newContent: string){

    const url = baseUrl + `pictures/${comment.pictureId}/comments/${comment.id}`;
    return this.http.put(url, {content: newContent}).do(() => this.$update.next(true));
  }

  public signalComment(comment: IComment, value: boolean){

    const url = baseUrl + `pictures/${comment.pictureId}/comments/${comment.id}/signal`;

    return this.http.put(url, {signaled: value}).do(() => this.$update.next(true));
  }

  public signalPicture(picture: IPicture, value: boolean){

    const url = baseUrl + `pictures/${picture.id}/signal`;
    return this.http.put(url, {signaled: value}).do(() => this.$update.next(true));
  }
}
