import { elements } from "../base";
import {limitTitle} from './searchView';

export const toggleLike = (isLiked) => {
  
    let icon = isLiked ? 'icon-heart':'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${icon}`);
    console.log(document.querySelector('.recipe__love use'));

}


//Rendering Header Heart button
export const showHeart = numLikes  => document.querySelector('.likes').style.visibility= numLikes>0 ? 'visible' : 'hidden';


//Rendering each liked recipe on the header like button
export const renderLike = (like)=>{

    const markup =  `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `
elements.likesList.insertAdjacentHTML('beforeend',markup);

}

//Removing each unliked recipe from the header like button
export const deleteLike = (id) => {

    const like = document.querySelector(`.likes__link[href*='#${id}'`).parentElement;
    if(like) like.parentElement.removeChild(like);
}
