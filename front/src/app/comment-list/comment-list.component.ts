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

  //private comments: Observable <Comment[]>;
  @Input() comments: ICommentExtended[];

  constructor(private socialService: SocialService) { }

  ngOnInit() {
    // this.comments = this.socialService.getComments(this.currentPicture);
  }
  
}
