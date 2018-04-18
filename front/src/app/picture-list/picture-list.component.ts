import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { IPicture, IPictureExtended } from '../../../../common/interface';
import { SocialService } from '../social.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

@Component({
  selector: "app-picture-list",
  templateUrl: "./picture-list.component.html",
  styleUrls: ["./picture-list.component.scss"]
})
export class PictureListComponent implements OnInit {

  // private pictures$: Observable<IPictureExtended[]>;
  private pictures: IPictureExtended[];
  private activityId: number;
  private currentPictureId: number = 0;
  private picture$: Observable<IPictureExtended>;
  private canDisplay = false;

  constructor(private socialService: SocialService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.activityId = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    this.socialService.getExtendedPictures(this.activityId).subscribe(pictures => {
      this.pictures = pictures;
      if (pictures.length > 0) {
        this.canDisplay = true;
      }
    });
  }

  get currentPicture(): IPictureExtended {
    return this.pictures[this.currentPictureId];
  }

  public onNext(){

    this.currentPictureId++;

    this.currentPictureId = this.currentPictureId % this.pictures.length;
    console.log(this.currentPictureId);
    
  }

  public onPrevious(){
    if(this.currentPictureId > 0){
      this.currentPictureId--;
    }else{
      this.currentPictureId = this.pictures.length-1;
    }


    console.log(this.currentPictureId);
  }
}
