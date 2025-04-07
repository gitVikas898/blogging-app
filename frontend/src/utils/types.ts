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
}