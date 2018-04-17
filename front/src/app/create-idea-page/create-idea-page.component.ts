import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';


@Component({
  selector: "app-create-idea-page",
  templateUrl: "./create-idea-page.component.html",
  styleUrls: ["./create-idea-page.component.scss"]
})
export class CreateIdeaPageComponent implements OnInit {
  private fileToUpload: File;

  constructor(private uploadFileService: UploadFileService) {}

  ngOnInit() {}

  private upload() {
    this.uploadFileService.uploadFile(this.fileToUpload);
  }
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        
        this.fileToUpload = reader.result;
        console.log(this.fileToUpload);
      };
    }
  }
}
