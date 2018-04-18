import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivityMode } from '../activity-mode.enum';
import { ActivityService } from '../activity.service';
import { Activity } from '../activity';
import { SocialService } from '../social.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { IPictureExtended } from '../../../../common/interface';

@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.scss']
})
export class SocialPageComponent implements OnInit {

  constructor(private sociaService: SocialService) { }

  ngOnInit() {
  }

}
