import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public $users: Observable<User[]>;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.$users= this.userService.getUsers();
  }

}
