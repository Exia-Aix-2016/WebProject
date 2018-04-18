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

  public pictures: IPictureExtended[] = [];
  id: number;

  constructor(private sociaService: SocialService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.sociaService.getExtendedPictures(this.id).subscribe((pictures) => {
      console.log(pictures);
      this.pictures = pictures;
    });
  }

}
