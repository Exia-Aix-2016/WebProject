import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IActivity } from "../../../common/interface";
import { baseUrl } from "./constants";

@Injectable()
export class ActivityService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IActivity[]> {
    return Observable.timer(0, 5000).switchMapTo(
      this.http.get<IActivity[]>(baseUrl + "activities")
    );
  }
}
