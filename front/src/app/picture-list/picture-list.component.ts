import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { IPicture, IPictureExtended } from '../../../../common/interface';
import { SocialService } from '../social.service';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss']
})
export class PictureListComponent implements OnInit {
  formdata: FormData;
  pictures: IPictureExtended[];
  activityId: number;
  currentPictureId = 0;
  canDisplay = false;

  constructor(
    private socialService: SocialService,
    private route: ActivatedRoute,
    private uploadFileService: UploadFileService,
  ) { }

  ngOnInit() {
    this.activityId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.socialService
      .getExtendedPictures(this.activityId)
      .subscribe(pictures => {
        this.pictures = pictures;
        if (pictures.length > 0) {
          this.canDisplay = true;
        }
      });
  }

  get currentPicture(): IPictureExtended {
    return this.pictures[this.currentPictureId];
  }

  public onNext() {
    this.currentPictureId++;

    this.currentPictureId = this.currentPictureId % this.pictures.length;
  }

  public onPrevious() {
    if (this.currentPictureId > 0) {
      this.currentPictureId--;
    } else {
      this.currentPictureId = this.pictures.length - 1;
    }
  }

  onSignal() {
    const signal = (this.pictures[this.currentPictureId].signaled) ? false : true;

    this.socialService
      .signalPicture(this.pictures[this.currentPictureId], signal)
      .subscribe();
  }
  onFileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.formdata = new FormData();

      const file: File = fileList[0];
      this.formdata.append('file', file, file.name);
      this.uploadFileService.uploadFile(this.formdata).subscribe(res => {

        console.log(res.imgUrl);
        this.socialService.postPicture({
          url: res.imgUrl,
          activityId: this.activityId
        }).subscribe();
      });
    }

  }
}

