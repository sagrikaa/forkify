import {elements} from '../base'

export const getInputValue = ()=>elements.searchInput.value;

export const clearUI = ()=>{
    elements.searchInput.value='';
    elements.searchResultList.innerHTML=''
};

const limitTitle = (title , limit=17) => {
    
    const newTitle = [];
    if(title.length>limit){
        title.split(' ').reduce((acc,cur)=>{
            if(acc+cur.length <= limit) newTitle.push(cur);
              
            return acc + cur.length;

        },0);
        return `${newTitle.join(' ')}...`;
    }
    return title;

};
const renderRecipe = recipe =>{
    const markup = `<li>
                        <a class="results__link" href="#${recipe.recipe_id}">
                            <figure class="results__fig">
                                <img src="${recipe.image_url}" alt="${recipe.title}">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">${limitTitle(recipe.title)}</h4>
                                <p class="results__author">${recipe.publisher}</p>
                            </div>
                        </a>
                    </li>`;
    elements.searchResultList.insertAdjacentHTML("beforeend",markup);
};

export const renderRecipes = recipes =>
{ 
    recipes.forEach(renderRecipe) 
};

