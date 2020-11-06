import { Pipe, PipeTransform } from '@angular/core';
import Post from '../interfaces/post';

@Pipe( {
  name: 'searchPosts'
} )
export class SearchPipe implements PipeTransform {

  transform( posts: Post[], searchString: string = '' ): Post[] {
    if ( !searchString.trim() ) {
      return posts;
    } else {
      return posts.filter( post => {
        return post.title.toLowerCase().includes( searchString.toLowerCase() );
      } );
    }
  }

}
