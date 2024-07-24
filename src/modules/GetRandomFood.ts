import { readFileSync } from "fs";

interface FoodMenu {
    title: string;
    ingredients: string[];
}

const menus:FoodMenu[] = JSON.parse(readFileSync("./assets/data/food_recipe_list.json", "utf-8"));

function includeEachMember(keyword:string,arr:string[]):boolean{
    for(let i=0;i<arr.length;i++){
        if(arr[i].includes(keyword)){
            return true;
        }
    }
    return false;
}

export async function getRandomFood(query: string | undefined) {
    if (!query) {
        return menus[Math.floor(Math.random() * menus.length)].title;
    }
    
    let filteredMenus = menus.filter((menu) => menu.ingredients.includes(query));

    if (filteredMenus.length === 0) {
        filteredMenus = menus.filter((menu) => includeEachMember(query,menu.ingredients) || menu.title.includes(query));
    }
    if (filteredMenus.length === 0) {
        return;
    }
    
    return filteredMenus[Math.floor(Math.random() * filteredMenus.length)].title;
}