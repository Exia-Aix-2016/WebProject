import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { IArticle } from '../../../../common/interface';
import { UploadFileService } from '../upload-file.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-article-manager',
  templateUrl: './article-manager.component.html',
  styleUrls: ['./article-manager.component.scss']
})
export class ArticleManagerComponent implements OnInit {

  @Input() model: IArticle | any = {};
  @Input() editMode = false;
  private form: FormGroup;
  private imgName = '';
  private categories$: Observable<string[]>;

  constructor(private uploadFileService: UploadFileService, private shopService: ShopService) { }

  ngOnInit() {
    this.categories$ = this.shopService.getCategories().map(categories => categories.map(c => c.name));
    this.form = new FormGroup({
      'name': new FormControl(this.model.name, [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
      'description': new FormControl(this.model.description, [Validators.required, Validators.minLength(8), Validators.maxLength(250)]),
      'price': new FormControl(this.model.price, [Validators.required, Validators.min(1)]),
      'pictureUrl': new FormControl(this.model.pictureUrl, [Validators.required, Validators.maxLength(100)]),
      'categoryName': new FormControl(this.model.categoryName, [Validators.required]),
      'selling': new FormControl(this.model.selling == null ? true : this.model.selling, [Validators.required]),
    });
    if (this.model.pictureUrl) {
      this.imgName = this.model.pictureUrl.split('/').pop();
    }
  }

  getClass(k: string) {
    const name = this.form.get(k);
    if (!name) {
      return {};
    }
    const invalid = name.invalid && (name.dirty || name.touched);
    const valid = name.status === 'VALID';
    return { 'is-valid': valid, 'is-invalid': invalid };
  }

  get submitEnabled(): boolean {
    return this.form.status === 'VALID';
  }

  onFileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const formdata = new FormData();

      const file: File = fileList[0];
      this.imgName = file.name;
      formdata.append('file', file, file.name);
      this.uploadFileService.uploadFile(formdata).subscribe(d => {
        this.form.setValue(Object.assign({}, this.form.value, { 'pictureUrl': d.imgUrl }));
      });
    }
  }

  submit() {
    const req$: Observable<any> = this.editMode
      ? this.shopService.editArticle(this.model.id, this.form.value)
      : this.shopService.createArticle(this.form.value);

    req$.subscribe({
      error: e => console.error(e)
    });
  }
}
