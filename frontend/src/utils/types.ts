


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
    readingTime?:number
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
  comments:CommentType[],
  readingTime:number
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

export interface TagSectionProps {
  onTagClick : (tagName:string)=>void;
  selectedTag :string | null;
}

export interface TagItem {
  id: number;
  name: string;
}

export interface BlogListProps {
  selectedTag: string | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
  // add more if needed (e.g. avatar, role)
}
export interface AuthStore {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}


export interface PrivateRouteProps {
  children: React.ReactNode;
}

export interface UserCardProps {
  username: string;
  id: number;
  email: string;
  followersCount: number;
  intrests: { title: string }[]; // note the plural name from your API response
  memberSince: string;
  bio: { content: string }[]; // array of bio objects
  blogs: BlogType[];
}

export interface BlogType {
  id:number;
  title:string
  content:string;
  createdAt:string;
}