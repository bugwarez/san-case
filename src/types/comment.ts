export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
export interface CommentWithUser extends Comment {
  user: {
    id: number;
    name: string;
  };
}
export interface CommentWithPost extends Comment {
  post: {
    id: number;
    title: string;
  };
}
export interface CommentWithUserAndPost
  extends CommentWithUser,
    CommentWithPost {}
