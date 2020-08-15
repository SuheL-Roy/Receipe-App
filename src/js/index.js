
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './veiws/SearchVeiw';
import * as recipeView from './veiws/recipeView';
import * as LsitView from './veiws/listView';
import * as LikesView from './veiws/likesView';
import{elements,Renderloader,clearloader} from './veiws/base';



const state={};

window.state=state;


const controlSearch= async()=>{
    const query=searchView.getInput();
    //const query='pizza';
   // console.log(query);

    if(query){
        state.search=new Search(query);
       searchView.clearInput();

       searchView.clearresult();


       Renderloader(elements.searchRes);
       try{
       await state.search.getResults();
       clearloader();
       //console.log(state.search.result)
       searchView.renderResults(state.search.result);
       }catch(err){
           alert('somthing went wrong with serach');
           clearloader();
       }

    }

}

elements.searchfrom.addEventListener('submit',e =>{
    e.preventDefault();
    controlSearch();
});


/*window.addEventListener('load',e =>{
    e.preventDefault();
    controlSearch();
});
*/


elements.searchResPages.addEventListener('click', e=>{
    const btn=e.target.closest('.btn-inline');
    if(btn){
        const goTopage=parseInt(btn.dataset.goto,10);
        searchView.clearresult();
        searchView.renderResults(state.search.result,goTopage);
       // console.log(goTopage);
    }
    

});


//const search=new Search('pizza');
//console.log(search)

 const controlRecipe= async ()=>{
     const id=window.location.hash.replace('#', '');
    console.log(id);
     if(id){
         recipeView.clearRecipe();
        Renderloader(elements.recipe);

        if (state.search) searchView.highlightSelected(id);






        state.recipe=new Recipe(id);
        
        // window.r=state.recipe;
       
        


     try{

        await state.recipe.getRecipe();
       
        state.recipe.parseIngredients();



        state.recipe.calcTime();
        state.recipe.calcServings();


       //console.log(state.recipe);
        clearloader();
         recipeView.renderRecipe(
             state.recipe,
             state.likes.isLiked(id)
            );
         

       }catch(err){
           console.log(err);
             alert('Error processing recipe');

         }


     }

 };
//window.addEventListener('hashchange',controlRecipe);
//window.addEventListener('load',controlRecipe);

['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));

/*
const controlList=()=>{
    if(!state.list) state.list=new List();

    state.recipe.Ingredients.forEach(el=>{
       const item = state.list.addItem(el.count,el.unit,el.ingredient);
       LsitView.renderItem(item);

    });
}
*/
const controlList = () => {
    // Create a new list IF there in none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.additem(el.count, el.unit, el.ingredient);
        LsitView.renderItem(item);
    });
}

elements.shopping.addEventListener('click',e=>{
    const id=e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete,.shopping__delete *')){
        state.list.deleteItem(id);
        LsitView.deletItem(id);


    }else if(e.target.matches('.shopping__count-value')){
        const val=parseFloat(e.target.value,10);
        state.list.upadateCount(id, val);
    }

});

//like
state.likes=new Likes();
LikesView.toggleLikeMenu(state.likes.getNUmLikes());

const controlLike=()=>{
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

 
    if (!state.likes.isLiked(currentID)) {
        
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        LikesView.toggleLikeBtn(true);
      //   LikesView.renderLike(newLike);



        console.log(state.likes);


    }else{

        state.likes.deleteLike(currentID);

        LikesView.toggleLikeBtn(false);

       //LikesView.deleteLike(currentID);





        console.log(state.likes);


    }
    LikesView.toggleLikeMenu(state.likes.getNUmLikes());
};







elements.recipe.addEventListener('click',e=>{
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings>1){
        state.recipe.updateServings('dec');
        recipeView.upadteServingIngredients(state.recipe);
        }

    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.upadteServingIngredients(state.recipe);

        
    }else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();


    }else if(e.target.matches('.recipe__love,.recipe__love *')){
        controlLike();

    }


    //console.log(state.recipe);

});

//const l=new List();
window.l=new List();