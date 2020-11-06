import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Post from 'src/app/shared/interfaces/post';
import { PostsService } from './../../../shared/services/posts.service';

@Component( {
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: [ './dashboard-page.component.scss' ]
} )
export class DashboardPageComponent implements OnInit, OnDestroy {

  public postsArray: Post[];
  public search: string;
  private postsSub: Subscription;

  constructor ( private postsService: PostsService ) {
    this.postsArray = [];
    this.search = '';
  }

  ngOnInit(): void {
    this.postsSub = this.postsService.getAll().subscribe( posts => this.postsArray = posts );
  }

  delete( id: string ): void {

  }

  ngOnDestroy(): void {
    if ( this.postsSub ) {
      this.postsSub.unsubscribe();
    }
  }

}
