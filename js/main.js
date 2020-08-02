"use strict"
window.addEventListener("load",go);
function go (){
 
// сохраняем скрытые книги
let hiddenBooks=[];

// функция вывода книг по автору в фильтре    
const filterButton = document.querySelector('.filter__button');    
filterButton.addEventListener('click', showBooksWithFilter);
function showBooksWithFilter (event){
  const selectedAuthor = document.querySelector('.filter__select');
  //console.log(selectedAuthor.value);

  //сброс значения поля поиска
  document.querySelector('.search__input').value = '';
  
  // добавлениe скрытых книг в каталог
  addHiddenBooks();

  if (selectedAuthor.value=='all-authors'){
    //console.log('Все авторы выведены');
    setAveragePrice ();
    return;
  } 

  let allCurrentBooks = document.querySelectorAll('.catalog__item');  
  for (let i=0; i<allCurrentBooks.length; i++){
    //console.log(allCurrentBooks[i].dataset.author);
    if(selectedAuthor.value != allCurrentBooks[i].dataset.author){
      //console.log('не совпал');
      hiddenBooks.push(allCurrentBooks[i].cloneNode(true));
      allCurrentBooks[i].remove();
    }else{
      //console.log(allCurrentBooks[i].dataset.author);
      continue; 
    }

  }
  setAveragePrice ();

}

//функия добавления скрытых книг в каталог
function addHiddenBooks(){
  const catalog = document.querySelector('.catalog');
  for (let i=0; i<hiddenBooks.length; i++){
    catalog.append(hiddenBooks[i]);
    //console.log(catalog);
  }
  hiddenBooks.length = 0;
  //console.log('скрытые книги',hiddenBooks);
}


//подсчет средней цены книги на странице
function setAveragePrice (){
  const allBookPreses = document.querySelectorAll('.price');
  let fullBookPreses=0;
  for (let i=0; i<allBookPreses.length ;i++){
    //console.log(allBookPreses[i].textContent);
    fullBookPreses += +allBookPreses[i].textContent;
  }
  
  fullBookPreses= (fullBookPreses/allBookPreses.length).toFixed(2);

  if(isNaN(fullBookPreses)){
    fullBookPreses = '~';
  }

  const averagePrice= document.querySelector('.average-price__price');
  //console.dir(averagePrice);
  averagePrice.textContent= fullBookPreses;


}
setAveragePrice ();

//Функция поиска книги по автору
const searchBtn = document.querySelector('.search__button');
//console.log('Кнопка поиска',searchBtn);
searchBtn.addEventListener('click',findBookBySearchString);
function findBookBySearchString (){
  let keyWord = document.querySelector('.search__input').value;
  keyWord = keyWord.toLowerCase();
  //console.log('Ключевое слово для поиска',keyWord);

  //сброс значения поля поиска и фильтра
  document.querySelector('.search__input').value = '';
  document.querySelector('.filter__select').selectedIndex = 0;


  //Проверка строки на валидность
  if (typeof (keyWord) != 'string'){
    //console.log('Проверка НЕ пройдена');
    return;
  }

  if (keyWord == ''){
    addHiddenBooks();
    setAveragePrice ();
    return;
  }
  if (keyWord == 'null'){
    return;
  }
  if (keyWord == 'undefined'){
    return;
  }
  if (keyWord == 'length'){
    return;
  }
  //console.log('Проверка пройдена');


  // добавлениe скрытых книг в каталог
  addHiddenBooks();

  //получаем nodelist строк для поиска сравнений
  let allBookAuthorsBlocks = document.querySelectorAll('.catalog__item-author');
  //console.log(allBookAuthorsBlocks);

  for(let i=0; i<allBookAuthorsBlocks.length ;i++){
    //console.log(allBookAuthorsBlocks[i].textContent);
    let condition = allBookAuthorsBlocks[i].textContent.toLowerCase().includes(keyWord);

    if(!condition){
      let bookItem = allBookAuthorsBlocks[i].parentElement.parentElement;
      console.log(bookItem);
      hiddenBooks.push(bookItem.cloneNode(true));
      bookItem.remove();
    }else{
      continue;
    }
  }
  setAveragePrice ();
}



}