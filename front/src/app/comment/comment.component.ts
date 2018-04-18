import { Component, OnInit, Input } from '@angular/core';
import { ICommentExtended } from '../../../../common/interface';
import { Comment } from '../comment';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() private comment: Comment;

  constructor(private socialService: SocialService) { }

  ngOnInit() { }

  get displayConent() {
    return this.comment.content;
  }

  toggleSignal(event: MouseEvent){
    this.socialService.signalComment(this.comment, !this.comment.signaled).subscribe({
      error: e => console.error(e)
    });
  }
  
}
