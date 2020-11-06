import Post from './post';

export interface FBAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface FBCreateResponse {
  name: string;
}

export interface FBGetAllResponse {
  [ key: string ]: Post;
}
