import axios from 'axios';


export default class Recipe{
    constructor(recipeId){
        this.recipe_id= recipeId;
    }

    async getRecipe(){
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.recipe_id}`);

            const recipe=res.data.recipe;
            this.img=recipe.image_url;
            this.ingredients= recipe.ingredients;
            this.publisher=recipe.publisher;
            this.publisher_url= recipe.publisher_url;
            this.social_rank= recipe.social_rank;
            this.source_url= recipe.source_url;
            this.title=recipe.title;
            this.parseIngredients();
        } catch (error) {
            alert("Server Error:"+ error);
        }
    }


    calcServing(){
        this.serving = 4;
    }

    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods*15;
    }

    parseIngredients(){

        const units = new Map([
            ['teaspoon','tsp'],
            ['teaspoons','tsps'],
             
            ['tablespoon','tbsp'],
            ['tablespoons','tbsps'],

            ['ounces','oz'],
            ['ounce','oz'],

            ['cup','cup'],
            ['cups','cups'],

            ['jar','jar'],
            ['jars','jars'],
            ['packages','packages']
            ]
            );

        const newIngredients = this.ingredients.map(e=>{
             //1. Unify the units
             //console.log(e);
             let ingredient = e.toLowerCase();
               units.forEach((value,key)=>{
                   ingredient=ingredient.replace(key,value);
                   
               })

             //2. Remove Paranthesis
             ingredient=ingredient.replace(/[{()}]/g, '');
               
        //3. Pare Ingredients into units, counts, ingredients
        ingredient=ingredient.split(" ");
        //console.log(ingredient);
        const unitIndex = ingredient.findIndex(el=> Array.from(units.values()).includes(el));
        //console.log(unitIndex);

        //4. Create an Object with Units,counts,ingredient

        let ingredientObj;
        let count;

        if(unitIndex>-1){
            count = ingredient.slice(0,unitIndex);

            if(count.length===1)
            count=eval(count[0].replace('-','+'));    
            else
            count = eval(count.join('+'));

            // count=parseInt(count,10);
            ingredientObj={
                unit:ingredient[unitIndex],
                ingredient:ingredient.slice(unitIndex+1,ingredient.length+1).join(' '),
                count:count?count.toFixed(2):1
            }

        }
        else if(parseInt(ingredient[0],10)){
            //There is no unit
            count = parseInt(ingredient[0],10);
            ingredientObj={
                unit:'unit',
                ingredient:ingredient.slice(1).join(' '),
                count:count?count.toFixed(2):1
            }
        }else if(unitIndex === -1){
            //No unit and no count
            ingredientObj={
                unit:'unit',
                ingredient:ingredient.join(' '),
                count:1
            }
        }
       
        //console.log(ingredientObj);
        return ingredientObj;
       

        })
        this.ingredients=newIngredients;
    }

    updateServing(type){

        if(type==='dec'){

            this.ingredients.forEach(e=>{
           
                e.count=e.count - (e.count/this.serving);

            });
            this.serving-=1;

          }

          else{
              
            this.ingredients.forEach(e=>{
           
                e.count=e.count + (e.count/this.serving);

            });
            this.serving+=1;
          }

         
    }

    
}