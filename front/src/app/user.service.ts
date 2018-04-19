import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { IUser, IGroup } from '../../../common/interface';
import { baseUrl } from './constants';
import { EditUserDto } from '../../../common/dto';

@Injectable()
export class UserService {

    private $update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


    constructor(private http: HttpClient) { }

    public getUsers() {
        return this.$update.switchMapTo(this.http.get<IUser[]>(baseUrl + 'users'));
    }

    public setGroup(editUserDto: EditUserDto, userId: number) {
        const url = baseUrl + 'users/' + userId;
        return this.http.put(url, editUserDto).do(() => this.$update.next(true));
    }

    public deleteUser(userId: number) {
        return this.http.delete(baseUrl + 'users/' + userId).do(() => this.$update.next(true));
    }

    public getGroups() {
        return this.$update.switchMapTo(this.http.get<IGroup[]>(baseUrl + 'groups'));
    }
}
