// Global app controller
//https://forkify-api.herokuapp.com/api/get?rId=${this.id}

import Search from './models/Search';
import {elements,renderLoader, clearLoader} from './base';
import {getInputValue,renderRecipes,clearSearchUI,highlightRecipe} from './views/searchView';
import Recipe from './models/Recipe';
import { renderRecipe, clearRecipeUI } from './views/recipeView';
import { renderItem,deleteItem } from './views/listView';
import { toggleLike, showHeart, renderLike, deleteLike } from './views/likeView';

import List from './models/List'
import Likes from './models/Likes';


/* Global state of the app
**-Current search state
**-Current Recipe being displayed
**-Current Shopping list
**-Liked recipes
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

/** Recipe Controller **/
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
                renderRecipe(state.recipe,state.likes.isLiked(id));

            }catch(err){
                console.log(err);
                alert('Something went wrong!');
                clearLoader();
            
            }
    }
}


/**  List Controller **/ 
const listController = () => {

    if(!state.list) state.list = new List();
    state.recipe.ingredients.forEach(el => {
      const item =  state.list.addItem(el.count,el.unit,el.ingredient);
      renderItem(item);
    })
}
state.likes = new Likes();


/**  Like Controller **/ 
const likeController = () => {


    const currentId = state.recipe.recipe_id;
    if(!state.likes.isLiked(currentId)){
        
        //Add the recipe to likes
        const newLike = state.likes.addLike(currentId,state.recipe.publisher,state.recipe.img,state.recipe.title);
        state.likes.addStorage();
        //Toggle the like button for recipe
        
        toggleLike(true);
        //Add like to the Like menu
        renderLike(newLike);

    } 
    else {
        //Toggle the like button for recipe
        toggleLike(false);
        //Remove from likes
        state.likes.deleteLike(currentId);
        state.likes.addStorage();
        deleteLike(currentId)
    }
    showHeart(state.likes.getNumLike());
  
}

/**Event listener for Recipe rendering**/

['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));

//Event Listener for clicks on Recipe page
elements.recipe.addEventListener('click',e=>{

        // user clicked on -/ + button for changing servings    
        if(e.target.matches('.btn-decarese , .btn-decrease *')){ 
            if(state.recipe.serving > 1)
            state.recipe.updateServing('dec');
            clearRecipeUI();
            renderRecipe(state.recipe);

        }

        else if(e.target.matches('.btn-increase , .btn-increase *')) {
            state.recipe.updateServing('inc');
            clearRecipeUI();
            renderRecipe(state.recipe);
 
        }

        //User clicks on Add to shooping list button
        else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
            listController();
        }

        // User clicks the like  button for a recipe
        else if(e.target.matches('.recipe__love , .recipe__love * ')){
            likeController();
        }



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


window.addEventListener('load', e=>{
    state.likes=new Likes();
    state.likes.readStorage()
    showHeart(state.likes.getNumLike());
    state.likes.likes.forEach(e=>renderLike(e));

})
window.state= state;
