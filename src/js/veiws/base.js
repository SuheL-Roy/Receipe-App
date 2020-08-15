
export const elements={
    searchfrom:document.querySelector('.search'),
    searchInput:document.querySelector('.search__field'),
    searchRes:document.querySelector('.results'),
    searchResList:document.querySelector('.results__list'),
    searchResPages:document.querySelector('.results__pages'),
    recipe:document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')

};
/*export const strings={
    loader: 'loader'
};
*/
/*export const elementStrings = {
    loader: "loader"
};

export const Renderloader=parent=>{
    const loader = `
    <div class="${elements.loader}">
    <svg>
        <use href="img/icons.svg#icon-cw"></use>
    </svg>
   </div>

    `;
    parent.insertAdjacentHTML('afterbegin', loader);
    
   const loader = `
   <div class="${elementStrings.loader}">
       <svg>
           <use href="img/icons.svg#icon-cw"></use>
       </svg>
   </div>
`;
parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearloader=()=>{
   // const loader=document.querySelector(`.${strings.loader}`);
    //if (loader) loader.parentElement.removeChild(loader);
    //const loader = document.querySelector(`.${strings.loader}`);
    //if (loader) loader.parentElement.removeChild(loader);
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};
*/

export const elementStrings = {
    loader: "loader"
  };
  
  export const Renderloader = parent => {
    const loader = `
    <div class="${elementStrings.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
  };
  
  export const clearloader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
      loader.parentElement.removeChild(loader);
    }
  };
  