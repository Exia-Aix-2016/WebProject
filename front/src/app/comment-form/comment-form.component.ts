import { Component, OnInit, Input } from '@angular/core';
import { SocialService } from '../social.service'
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  userId: number;
  @Input() pictureId: number;
  @Input() username: string;
  content: string;
  constructor(private authService: AuthService, private socialService: SocialService) { }


  ngOnInit() {

  }

  onPost(){


    this.authService.connection.subscribe(user => {

      this.socialService.postComment({
        pictureId: this.pictureId,
        userId: user.id,
        content: this.content
      }).subscribe();

      
      
    });
  }

}
