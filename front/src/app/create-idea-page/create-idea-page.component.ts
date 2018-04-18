import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { CreateActivityDto } from '../../../../common/dto/activity.dto';


@Component({
  selector: "app-create-idea-page",
  templateUrl: "./create-idea-page.component.html",
  styleUrls: ["./create-idea-page.component.scss"]
})
export class CreateIdeaPageComponent implements OnInit {
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  private formdata: FormData;
  private nameImg: string;

  private nameActivity: string;
  private descActivity: string;
  private dateActivity: string;
  private priceActivity: string;
  private occurenceActivity: string = "day";

  constructor(private uploadFileService: UploadFileService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {}

  private upload() {

    

    
    this.uploadFileService.uploadFile(this.formdata).subscribe(
      data => { 
        console.log((<{error, imgUrl}>data).imgUrl);
        console.log(this.nameActivity);
        console.log(this.descActivity);
        console.log(this.dateActivity);
        console.log(this.priceActivity);
      
      },
      error => console.log(error)
  );
  }
  onFileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        this.formdata = new FormData();

        let file: File = fileList[0];
        this.nameImg = file.name;
        this.formdata.append('file', file, file.name);

    }
  }
}
