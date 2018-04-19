import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../../../common/interface';
import { UserService } from '../user.service';
import { baseUrl } from '../constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() private user: IUser;

  constructor(private userService: UserService) { }

  ngOnInit() { }

  edit(groupName: string, userId: number){
    this.userService.setGroup(groupName, userId);
  }

  delete(userId){
    this.userService.deleteUser(userId);
  }
    
}

