import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
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

  constructor(private uploadFileService: UploadFileService) { }

  ngOnInit() { }

  private upload() {
    this.uploadFileService.uploadFile(this.formdata).subscribe(
      data => {
        console.log((<{ error, imgUrl }>data).imgUrl);
        console.log(this.nameActivity);
        console.log(this.descActivity);
        console.log(this.dateActivity);
        console.log(this.priceActivity);

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
