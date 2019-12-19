import {elements} from '../base'
import {fraction} from 'fractional'

export const clearRecipeUI = ()=>{

    elements.recipe.innerHTML='';
    
}

const beautifyCount = count =>{

    //count = 2 => 2
    //count = 2.5 > 2 1/2
    //count =0.5 1/2

    const [int,dec] = count.toString().split('.').map(e=>parseInt(e,10));
   // console.log(int+" , "+dec);
    if(!dec)
    return int ;

    if(int===0){
        const fr = new Fraction(count);
        //console.log(fr);
        return (`${fr.numerator}/${fr.denominator}`);
    }

    else {
       

        const fr = new Fraction(count - int);
        return `${int} ${fr.numerator}/${fr.denominator}`

    }
    

}
export const renderRecipe = (recipe)=>{
    //console.log(recipe);
 const markup = `<figure class="recipe__fig">
 <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
 <h1 class="recipe__title">
     <span>${recipe.title}</span>
 </h1>
</figure>
<div class="recipe__details">
 <div class="recipe__info">
     <svg class="recipe__info-icon">
         <use href="img/icons.svg#icon-stopwatch"></use>
     </svg>
     <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
     <span class="recipe__info-text"> minutes</span>
 </div>
 <div class="recipe__info">
     <svg class="recipe__info-icon">
         <use href="img/icons.svg#icon-man"></use>
     </svg>
     <span class="recipe__info-data recipe__info-data--people">${recipe.serving}</span>
     <span class="recipe__info-text"> servings</span>

     <div class="recipe__info-buttons">
         <button class="btn-tiny">
             <svg>
                 <use href="img/icons.svg#icon-circle-with-minus"></use>
             </svg>
         </button>
         <button class="btn-tiny">
             <svg>
                 <use href="img/icons.svg#icon-circle-with-plus"></use>
             </svg>
         </button>
     </div>

 </div>
 <button class="recipe__love">
     <svg class="header__likes">
         <use href="img/icons.svg#icon-heart-outlined"></use>
     </svg>
 </button>
</div>



<div class="recipe__ingredients">
 <ul class="recipe__ingredient-list">
 
${recipe.ingredients.map(e=>
  `  <li class="recipe__item">
   <svg class="recipe__icon">
       <use href="img/icons.svg#icon-check"></use>
   </svg>
   <div class="recipe__count">${beautifyCount(e.count)}</div>
   <div class="recipe__ingredient">
       <span class="recipe__unit">${e.unit}</span>
       ${e.ingredient}
   </div>
</li>`
    ).join(' ')}
         
 </ul>

 <button class="btn-small recipe__btn">
     <svg class="search__icon">
         <use href="img/icons.svg#icon-shopping-cart"></use>
     </svg>
     <span>Add to shopping list</span>
 </button>

 <div class="recipe__directions">
 <h2 class="heading-2">How to cook it</h2>
 <p class="recipe__directions-text">
     This recipe was carefully designed and tested by
     <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
 </p>
 <a class="btn-small recipe__btn" href="${recipe.source_url}" target="_blank">
     <span>Directions</span>
     <svg class="search__icon">
         <use href="img/icons.svg#icon-triangle-right"></use>
     </svg>

 </a>
</div>
`;

elements.recipe.insertAdjacentHTML('afterbegin',markup);

} 