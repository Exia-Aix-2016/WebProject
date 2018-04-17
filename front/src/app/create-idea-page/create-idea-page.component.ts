import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { CreateActivityDto } from '../../../../common/dto/activity.dto';


@Component({
  selector: "app-create-idea-page",
  templateUrl: "./create-idea-page.component.html",
  styleUrls: ["./create-idea-page.component.scss"]
})
export class CreateIdeaPageComponent implements OnInit {


  constructor(private uploadFileService: UploadFileService) {}

  private formdata: FormData;
  private activity: CreateActivityDto;
  ngOnInit() {}

  private upload() {

    
    this.uploadFileService.uploadFile(this.formdata).subscribe(
      data => { console.log(data)
      
      },
      error => console.log(error)
  );
  }
  onFileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        this.formdata = new FormData();

        let file: File = fileList[0];
        this.formdata.append('file', file, file.name);

    }
  }
}
