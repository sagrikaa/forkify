import axios from 'axios';


export default class Recipe{
    constructor(recipeId){
        this.recipeId= recipeId;
    }

    async getRecipe(){
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.recipeId}`);
            console.log(res.data.recipe);
            this.recipe= res.data.recipe;
        } catch (error) {
            alert(error);
        }
    }
}