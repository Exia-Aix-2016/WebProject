import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Payload } from '../payload.interface';

@Component({
  selector: 'app-is-connected',
  templateUrl: './is-connected.component.html',
  styleUrls: ['./is-connected.component.scss']
})
export class IsConnectedComponent implements OnInit {

  @Input() group: string;
  @Input() groups: string[];
  display = false;

  constructor(private authService: AuthService) { }

  private getDisplay(user: Payload): boolean {
    if (user) {
      if (this.groups) {
        return this.groups.find(g => g === user.groupName) ? true : false;
      } else if (this.group) {
        return this.group === user.groupName;
      }
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.authService.connection.subscribe(user => {
      this.display = this.getDisplay(user);
    });
  }
}
