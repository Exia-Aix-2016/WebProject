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
  private maxSize = 5;
  private totalItems = 0;
  private currentPage = 0;
  //private comments: Observable <Comment[]>;
  @Input() comments: ICommentExtended[];

  constructor(private socialService: SocialService) { }

  ngOnInit() {

    this.totalItems = (this.comments.length * 10);
  }


  get getPageComments(): ICommentExtended[]{
    return this.comments.slice(this.currentPage);
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
