import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { IUser } from "../../../common/interface";
import { baseUrl } from "./constants";
import { EditUserDto } from "../../../common/dto";

@Injectable()
export class UserService{

    private $update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


    constructor(private http: HttpClient) { }

    public getUsers(){
        return this.http.get<IUser[]>(baseUrl + "users");
    }

    public setGroup(group: string, userId: number){
        const url = baseUrl + 'users/' + userId;
        return this.http.put<void>(url, { group }).do(() => this.$update.next(true));
    }

    public deleteUser(userId: number){
        return this.http.delete<void>(baseUrl + 'users/' + userId).do(v => this.$update.next(true));;
    }
}