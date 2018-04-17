import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivityMode } from '../activity-mode.enum';
import { ActivityService } from '../activity.service';
import { Activity } from '../activity';
import { SocialService } from '../social.service';
import { Picture } from '../picture';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.scss']
})
export class SocialPageComponent implements OnInit {

  public pictures: Picture[] = [];
  id: number;

  constructor(private sociaService: SocialService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.sociaService.getPictures(this.id).subscribe((pictures) =>{
      this.pictures = pictures;
    });
   }

}
