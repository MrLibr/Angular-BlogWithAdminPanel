
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import UrlConstants from 'src/constants/url-constants';
import { FBCreateResponse, FBGetAllResponse } from '../interfaces/fb-responses';
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

  getAll(): Observable<Post[]> {
    return this.http
      .get( `${ UrlConstants.DATA_BASE }/posts.json` )
      .pipe( map( ( response: FBGetAllResponse ) => {
        return Object
          .keys( response )
          .map( ( key: string ) => ( {
            ...response[ key ],
            id: key,
            date: new Date( response[ key ].date )
          } ) );
      } ) );
  }

  delete( id: string ): Observable<void> {
    return this.http.delete<void>( `${ UrlConstants.DATA_BASE }/posts/${ id }.json` );
  }
}
