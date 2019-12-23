// Global app controller
//https://forkify-api.herokuapp.com/api/get?rId=${this.id}

import Search from './models/Search';
import {elements,renderLoader, clearLoader} from './base';
import {getInputValue,renderRecipes,clearSearchUI,highlightRecipe} from './views/searchView';
import Recipe from './models/Recipe';
import { renderRecipe, clearRecipeUI } from './views/recipeView';
import { renderItem,deleteItem } from './views/listView';

import List from './models/List'


/* Global state of the app
**-Current search state
**-Current Recipe being displayed
**-Current Shopping list
**-Lied recipes
*/
const state = {
};

/*Search Controller*/
const controlSearch = async ()=>{
//1. Get query from the view
const query = getInputValue();
if(query){
    //2. Add new search object to the state
    state.search = new Search(query);

    //3. Cleanup UI for displaying result
    clearSearchUI();
    renderLoader(elements.searchResults);
    //4. Search for recipes
    await state.search.getResult();

    //5. Display recipes
    clearLoader();
    renderRecipes(state.search.recipes);

}

};

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
});


//Event listener for the pagination button
elements.resultPages.addEventListener('click',e=>{

    const button = e.target.closest('.btn-inline');
    if(button)
    {
        const page = parseInt(button.dataset.goto);
        clearSearchUI();

        renderRecipes(state.search.recipes,page);}

})

/* Recipe Controller*/
const controlRecipe= async ()=>{
    //1. retrieve hash ID from the URL
    const id= window.location.hash.replace('#','');
    if(id){

    //2. Add new Recipe object to state
    state.recipe = new Recipe(id);

    if(state.search) highlightRecipe(id);
    //3. Cleanup UI for displaying the recipe
    clearRecipeUI();
    renderLoader(elements.recipe);

            try{
                //4. Retrieve recipe using the ID
                await state.recipe.getRecipe();
               // console.log(state.recipe);
                //5. Display the recipe
                clearLoader();
                state.recipe.calcTime();
                state.recipe.calcServing();
                renderRecipe(state.recipe);

            }catch(err){
                console.log(err);
                alert('Something went wrong!');
                clearLoader();
            
            }
    }
}


// List Controller

const listController = () => {

    if(!state.list) state.list = new List();
    state.recipe.ingredients.forEach(el => {
      const item =  state.list.addItem(el.count,el.unit,el.ingredient);
      renderItem(item);
    } )
}


//Event listener for Recipe rendering

//window.addEventListener('hashchange',controlRecipe);
['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));

//Event Listener for the Servings change
elements.recipe.addEventListener('click',e=>{

if(e.target.matches('.btn-decarese , .btn-decrease *')){ 
    if(state.recipe.serving > 1)
    state.recipe.updateServing('dec');
}
else if(e.target.matches('.btn-increase , .btn-increase *')) {state.recipe.updateServing('inc');
}
else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
    listController();
}

clearRecipeUI();
renderRecipe(state.recipe);


});

//Event Listener for deleting an item from Shopping List

elements.shopping.addEventListener('click',e=>{
    const itemId = e.target.closest('.shopping__item').dataset.itemid;
    
    if(e.target.matches('.shopping__delete , .shopping__delete *')){
        state.list.deleteItem(itemId);
        deleteItem(itemId);
    }

    else if (e.target.matches('.shopping__item--count , shopping__item--count *')){
        state.list.updateCount(itemId,e.target.value);
        
    }
})

window.state= state;
window.l=new List();
