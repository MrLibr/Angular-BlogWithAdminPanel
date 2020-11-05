
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import UrlConstants from 'src/constants/url-constants';
import FBCreateResponse from '../interfaces/fb-create-response';
import Post from '../interfaces/post';

@Injectable( { providedIn: 'root' } )
export class PostsService {

  constructor ( private http: HttpClient ) { }

  create( post: Post ): Observable<Post> {
    return this.http
      .post( `${ UrlConstants.DATA_BASE }/posts.json`, post )
      .pipe( map( ( response: FBCreateResponse ) => {
        return {
          ...post,
          id: response.name,
          date: new Date( post.date )
        };
      } ) );
  }
}
