import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Post from 'src/app/shared/interfaces/post';
import AlertConstants from 'src/constants/alert-constants';
import { PostsService } from './../../../shared/services/posts.service';
import { AlertService } from './../../shared/services/alert.service';

@Component( {
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: [ './dashboard-page.component.scss' ]
} )
export class DashboardPageComponent implements OnInit, OnDestroy {

  public postsArray: Post[];
  public search: string;
  private postsSub: Subscription;
  private deleteSub: Subscription;

  constructor (
    private postsService: PostsService,
    private alertService: AlertService
  ) {
    this.postsArray = [];
    this.search = '';
  }

  ngOnInit(): void {
    this.postsSub = this.postsService.getAll().subscribe( posts => this.postsArray = posts );
  }

  delete( id: string ): void {
    this.deleteSub = this.postsService.delete( id ).subscribe( () => {
      this.postsArray = this.postsArray.filter( post => post.id !== id );
      this.alertService.warning( AlertConstants.SUCCESS_DELETE_POST );
    } );
  }

  ngOnDestroy(): void {
    if ( this.postsSub ) {
      this.postsSub.unsubscribe();
    }

    if ( this.deleteSub ) {
      this.deleteSub.unsubscribe();
    }
  }

}
