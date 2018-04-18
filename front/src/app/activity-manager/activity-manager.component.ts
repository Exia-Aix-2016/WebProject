import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { ActivityService } from '../activity.service';
import { CreateActivityDto } from '../../../../common/dto/activity.dto';

@Component({
  selector: 'app-activity-manager',
  templateUrl: './activity-manager.component.html',
  styleUrls: ['./activity-manager.component.scss']
})
export class ActivityManagerComponent implements OnInit {
  minDate = new Date(Date.now());

  private formdata: FormData;
  private nameImg: string;

  private nameActivity: string;
  private descActivity: string;
  private dateActivity: Date = new Date(Date.now());
  private priceActivity = 0;
  private occurenceActivity = 'day';

  constructor(private uploadFileService: UploadFileService, private activityService: ActivityService) { }

  ngOnInit() { }

  private upload() {
    this.uploadFileService.uploadFile(this.formdata).subscribe(
      data => {
        let posterUrl: string = (<{ error, imgUrl }>data).imgUrl

        this.activityService.createIdea({
          name: this.nameActivity,
          description: this.descActivity,
          date: this.dateActivity,
          posterUrl: posterUrl,
          price: this.priceActivity,
          occurrenceName: 'day'
          
        }).subscribe(
          data => console.log(data),
          error => console.log(error)
        );

      },
      error => console.log(error)
    );
  }

  onFileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.formdata = new FormData();

      const file: File = fileList[0];
      this.nameImg = file.name;
      this.formdata.append('file', file, file.name);

    }
  }
}
