import {elements} from '../base'

const clearRecipeUI = ()=>{
    
}
export const renderRecipe = (recipe)=>{

 const markup = `<figure class="recipe__fig">
 <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe__img">
 <h1 class="recipe__title">
     <span>${recipe.title}</span>
 </h1>
</figure>
`;

elements.recipe.insertAdjacentElement('beforeend',markup);

} 