import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IComment, IPicture, ICommentExtended } from '../../../../common/interface';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() canDisplay: boolean;
  private maxSize = 4;
  private totalItems = 0;
  private currentPage = 1;
  //private comments: Observable <Comment[]>;
  @Input() comments: ICommentExtended[];

  constructor(private socialService: SocialService) { }

  ngOnInit() {

  }


  get getPageComments(): ICommentExtended[]{
    this.totalItems = (this.comments.length / this.maxSize) * 10;
    return this.comments.slice((this.currentPage*this.maxSize)-this.maxSize);
  }

  private pageChanged(event: any): void {

    if((event.page-1) > this.comments.length){
      this.currentPage--;
    }else{
      this.currentPage = (event.page-1);
    }
    if((event.page-1) < 0){
      this.currentPage = 0;
    }


  }

}
