import { Component, OnInit, Input } from '@angular/core';
import { IUser, IGroup } from '../../../../common/interface';
import { UserService } from '../user.service';
import { baseUrl } from '../constants';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: IUser;
  $groups: Observable<IGroup[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.$groups = this.userService.getGroups();
  }

  edit(groupName: string, userId: number) {
    this.userService.setGroup({ groupName }, userId).subscribe();
  }

  delete(userId) {
    this.userService.deleteUser(userId).subscribe();
  }
}
