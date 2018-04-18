import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UploadFileService } from '../upload-file.service';
import { ActivityService } from '../activity.service';
import { } from '../arti';
import { CreateActivityDto } from '../../../../common/dto/activity.dto';
import { Activity } from '../activity';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-activity-manager',
  templateUrl: './activity-manager.component.html',
  styleUrls: ['./activity-manager.component.scss']
})
export class ActivityManagerComponent implements OnInit {

  @HostBinding('class.container') isContainer = true;
  @Input() editMode = false;
  @Input() activityMode = false;
  @Input() model: {
    id?: number;
    name?: string;
    description?: string,
    posterUrl?: string,
    date?: Date,
    price?: number,
    occurrenceName?: string,
    planned?: boolean
  } = {};
  private activityForm: FormGroup;
  private formdata: FormData;
  private minDate = new Date(Date.now());
  private imgName: string;
  private occurrences$: Observable<string[]>;

  constructor(private uploadFileService: UploadFileService, private activityService: ActivityService) { }

  ngOnInit() {
    console.log(this.model);
    this.activityForm = new FormGroup({
      'name': new FormControl(this.model.name, [Validators.required, Validators.minLength(4)]),
      'description': new FormControl(this.model.description, [Validators.required, Validators.minLength(10)]),
      'posterUrl': new FormControl(this.model.posterUrl, [Validators.required]),
    });
    console.log(this.activityForm.value, this.activityForm.status);
    if (this.model.posterUrl) {
      this.imgName = this.model.posterUrl.split('/').pop();
    }
    if (this.editMode) {
      this.addControls();
      this.activityMode = true;
    }
    this.occurrences$ = this.activityService.getOccurrences();
  }

  private addControls() {
    this.activityForm.addControl('date', new FormControl(this.model.date, [Validators.required]));
    this.activityForm.addControl('price', new FormControl(this.model.price, [Validators.required, Validators.min(0)]));
    this.activityForm.addControl('occurrenceName', new FormControl(this.model.occurrenceName, [Validators.required]));
  }

  private removeControls() {
    this.activityForm.removeControl('date');
    this.activityForm.removeControl('price');
    this.activityForm.removeControl('occurrenceName');
  }

  updateFormControls(event?: MouseEvent) {
    const actM = event ? (<HTMLInputElement>event.toElement).checked : false;
    if (actM) {
      this.addControls();
    } else {
      this.removeControls();
    }
  }

  getClass(k: string) {
    const name = this.activityForm.get(k);
    if (!name) {
      return {};
    }
    const invalid = name.invalid && (name.dirty || name.touched);
    const valid = name.status === 'VALID';
    return { 'is-valid': valid, 'is-invalid': invalid };
  }

  private submit() {
    let req: Observable<any>;
    if (this.editMode) {
      req = this.activityService.edit(Object.assign({ id: this.model.id, planned: true }, this.activityForm.value));
    } else if (this.activityMode) {
      req = this.activityService.createActivity(this.activityForm.value);
    } else {
      req = this.activityService.createIdea(this.activityForm.value);
    }

    req.subscribe(() => console.log('upload woked'), console.error);
  }

  get submitEnabled(): boolean {
    return this.activityForm.status === 'VALID';
  }

  onFileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.formdata = new FormData();

      const file: File = fileList[0];
      this.imgName = file.name;
      this.formdata.append('file', file, file.name);
      this.uploadFileService.uploadFile(this.formdata).subscribe(d => {
        this.activityForm.setValue(Object.assign({}, this.activityForm.value, { 'posterUrl': this.img.url }));
      });
    }
  }
}
