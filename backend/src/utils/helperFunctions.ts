function estimateReadingTime(content:string){
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words/200);
    return readingTime;
}

export default estimateReadingTime;