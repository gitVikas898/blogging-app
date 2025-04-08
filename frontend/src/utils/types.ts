
export interface BlogCardProps {
    id:number,
    title:string,
    content:string,
    author:{
        username:string
    },
    createdAt:string
    updatedAt:string,
    isPublished?:boolean
    BlogTags: {
        tag: {
          id: number;
          name: string;
        };
      }[];
    _count:{
        Like:number;
    },
    comments:CommentType[]
    onClick?: () => void;
}

export interface BlogType {
  id: number;
  title: string;
  content: string;
  author: {
    username: string;
  };
  createdAt: string;
  BlogTags: { tag: { id: number; name: string } }[];
  _count: {
    Like: number;
  };
  comments:CommentType[]
}

export interface BlogCommentProps {
  blogId:number,
  comments:CommentType[]
  isAuthenticated:boolean,
  onNewComment?:()=>void
}

export interface CommentType {
  id:number,
  content:string,
  blogId?:number
  createdAt:string,
  user:{
    username:string
  }
}

export interface SignInModalProps{
    onClose:()=>void
}