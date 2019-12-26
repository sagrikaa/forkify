import {elements} from '../base'

export const getInputValue = ()=>elements.searchInput.value;

export const clearSearchUI = ()=>{
    elements.searchInput.value='';
    elements.searchResultList.innerHTML='';
    elements.resultPages.innerHTML='';
};

export const limitTitle = (title , limit=17) => {
    
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

const renderPaginationButton = ( type,page ) =>
`<button class="btn-inline results__btn--${type}" data-goto=${type==="next"?(page+1):(page-1)}>
    <span>Page ${type==="next"?(page+1):(page-1)}</span>
    <svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${type==="next"?'right':'left'}"></use>
</svg>
</button>`




const renderPagination = (page,limit,numOfResults)=>{
    let paginationButton ;
    //First page:only render the next button
   if(page===1){
    paginationButton=renderPaginationButton('next',page);
   }
   //Last page:only render the prev button
   else if(page===Math.ceil(numOfResults/limit)){
    paginationButton = renderPaginationButton('prev',page);
   }
   //Any other page: render both next and prev button
   else 
   paginationButton = renderPaginationButton('next',page)+renderPaginationButton('prev',page);


   elements.resultPages.insertAdjacentHTML('afterbegin',paginationButton);


}

export const highlightRecipe = (id)=>{
    const r=Array.from(document.querySelectorAll('.results__link')).map(e=>e.classList.remove('results__link--active'));
    console.log(r);
    document.querySelector(`a[href*="${id}"]`).classList.add('results__link--active');
}

export const renderRecipes = (recipes,page=1,limit=10) =>
{   
    const start = (page-1)*limit;
    const end = page*limit;
   
    recipes.slice(start,end).forEach(renderRecipe); 
    renderPagination(page,limit,recipes.length);
};

