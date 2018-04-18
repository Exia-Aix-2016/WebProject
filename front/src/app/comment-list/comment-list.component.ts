import { Component, OnInit } from '@angular/core';
import { IComment, IPicture } from '../../../../common/interface';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  private comments: IComment[];
  constructor(private socialService: SocialService) { }

  ngOnInit() {


  }

  getComments(picture: IPicture): void{
    this.socialService.getComments(picture).subscribe(
      data =>  this.comments = data
    );
  }
}
