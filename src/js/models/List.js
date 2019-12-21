import uniqid from 'uniqid';
export default class List{
    constructor (){
        this.items = []
    }

    addItem(count,unit,ingredient){

        const item = {
            id:uniqid(),
            count,
            unit,
            ingredient
        }

        this.items.push(item);
        return item;
    }

    deleteItem(id){
        this.items.splice(this.items.findIndex(e=>e.id===id),1);
        return this.items;
    }

    updateCount(id,count){
        const item =this.items.find(e=>e.id===id);
        item.count=count;
        return item;
         
    }
}