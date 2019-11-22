// Global app controller
//https://forkify-api.herokuapp.com/api/get?rId=${this.id}

import Search from './models/Search'
import {elements} from './base'
import {getInputValue,renderRecipes,clearUI} from './views/searchView'

/* Global state of the app
**-Current search state
**-Current Recipe being displayed
**-Current Shopping list
**-Lied recipes
*/
const state = {

};

const controlSearch = async ()=>{
//1. Get query from the view
const query = getInputValue();
if(query){
    //2. Add new serach object to the state
    state.search = new Search(query);

    //3. Cleanup UI for displaying result
    clearUI();
    //4. Search for recipes
    await state.search.getResult();

    //5. Display recipes
    console.log(state.search.recipes);
    renderRecipes(state.search.recipes);

}

};

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
});


