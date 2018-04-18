import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UploadFileService } from '../upload-file.service';
import { ActivityService } from '../activity.service';
import { } from '../arti';
import { CreateActivityDto } from '../../../../common/dto/activity.dto';
import { Activity } from '../activity';

@Component({
  selector: 'app-activity-manager',
  templateUrl: './activity-manager.component.html',
  styleUrls: ['./activity-manager.component.scss']
})
export class ActivityManagerComponent implements OnInit {

  @Input() activityMode = false;

  private formdata: FormData;
  private nameImg: string;
  private nameActivity: string;
  private descActivity: string;
  private dateActivity: Date = new Date(Date.now());
  private priceActivity = 0;
  private posterUrl: string;
  private occurenceActivity = 'day';
  private minDate = new Date(Date.now());
  private submitEnabled = false;

  constructor(private uploadFileService: UploadFileService, private activityService: ActivityService) { }

  ngOnInit() { }

  private upload() {
    let req: Observable<Activity>;
    if (this.activityMode) {
      req = this.activityService.createActivity({
        name: this.nameActivity,
        description: this.descActivity,
        date: this.dateActivity,
        posterUrl: this.posterUrl,
        price: this.priceActivity,
        occurrenceName: 'daily'

      });
    } else {
      req = this.activityService.createIdea({
        name: this.nameActivity,
        description: this.descActivity,
        posterUrl: this.posterUrl,
      });
    }

    req.subscribe(() => console.log('upload woked'), console.error);
  }

  onFileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.formdata = new FormData();

      const file: File = fileList[0];
      this.nameImg = file.name;
      this.formdata.append('file', file, file.name);
      this.submitEnabled = false;
      this.uploadFileService.uploadFile(this.formdata).subscribe(d => {
        this.posterUrl = d.imgUrl;
        this.submitEnabled = true;
      });
    }
  }
}
