import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Spinner from "./Spinner";
import { TagItem, TagSectionProps } from "../utils/types";



function TagSection({onTagClick,selectedTag}:TagSectionProps) {

    const [tags,setTags] = useState<TagItem[]>([]);

    const getData = async()=>{
        const response = await fetch("http://localhost:8000/api/tags");
        const data = await response.json();
        console.log(data);
        setTags(data);
    }

    useEffect(()=>{
        getData();
    },[]);

    if(!tags) return <Spinner/>
   

  return (
    <Carousel
      items={tags}
      itemClassName="inline-block"
      renderItem={(tag) => (
        <span
          onClick={()=>onTagClick(tag.name)}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium cursor-pointer ${
            selectedTag === tag.name
              ? "bg-lime-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}>
          #{tag?.name}
        </span>
      )}
    />
  );
}
export default TagSection