export default class Likes {
    constructor(){
        this.likes=[]
    }

    addLike(id,author,img,title){
        const like = {id,author,img,title}
        this.likes.push(like);
        return like;
    }

    deleteLike(id){
       const likeId = this.likes.findIndex(e=>e.id===id)
        this.likes.splice(likeId,1);
        return this.likes;
    }

   isLiked(id){
       return(this.likes.findIndex(e=>e.id===id)!==-1)
   } 

   getNumLike(){
       return this.likes.length;
   }
}