//    == values
//   === values and datatypes
// > <
// >= <=
// != هل القيمة دي لا تساوي ولا لا
//   console.log( 5 == "5" )
//   console.log( 5 === "5")
// && and 
// || or
// let product = "TV-Samsung"; 
// let size = 50; 
// let salary = 10000; 
 
// console.log( salary < 12000 || size == 40);


// let container = document.getElementById('container')

// container.innerText = 'hello world';

// console.log(container)


// element.style.property = "value";

// container.style.background = "#444";
// container.style.color = "red"; 


// element.style.cssText =

// container.style.cssText = `
// background:#444;
// color:white `

// container.style.setProperty(`color`,`red`)

// let container = document.createElement(`div`);
// let head = document.createElement(`h1`);
// let img = document.createElement(`img`);

// let content = document.createTextNode(`I LOVE VERONICA`);
// head.appendChild(content);
// img.src =` images/love.png`;

// container.appendChild(head);
// container.appendChild(img);
// document.body.appendChild(container)

// console.log(container)


// let container = document.createElement(`div`)
// document.body.appendChild(container)
// container.style.textAlign = `center`;
// function element()
// {
//     // elements

//     let card = document.createElement(`div`);
//     let title = document.createElement(`h2`);
//     let age = document.createElement(`p`);
//     let img =document.createElement(`img`);

//     // content
//     let head = document.createTextNode(`title`)
//     let agecontent =document.createTextNode(`age`)
//     img.src = `images/13.jpg`;
//     title.appendChild(head) 
//     age.appendChild(agecontent)


//     // style
//     card.style.width = `200px`;
//     card.style.background = `#444`;
//     card.style.color = `#fff`;
//     card.style.padding = `10px`;
//     card.style.margin = `2px`;
//     card.style.display = `inline-block`;


//     card.appendChild(title);
//     card.appendChild(age);
//     card.appendChild(img);
    
//     container.appendChild(card);

// }

// for(let i = 0; i < 4; i++){
//     element()
// }


// console.log(container)

// let txt = document.getElementById(`txt`);
// let myBtn = document.getElementById(`btn`);


// window.onload = function(){
//     txt.focus();
// }

// myBtn.onclick = function(){
//     myBtn.style.background = `red ` ;
// }



// window.scroll(200,400)

// =scroll=
// let btn = document.getElementById(`btn`);

// window.onscroll = function(){
//     if(scrollY >= 100){
//         btn.style.display = `block`;
//     }
//     else{
//         btn.style.display = `none`;
//     }
// }
// btn.onclick = function(){
//     scroll({
//         left:0,
//         top:0,
//         behavior:"smooth"
//     })
// }


// localStorage.setItem(`name`,`besho`);

// localStorage = `besho`;


let title = document.getElementById( "title");
let price = document.getElementById( "price");
let taxes = document.getElementById( "taxes");
let ads = document.getElementById( "ads");
let discount = document.getElementById( "discount");
let total = document.getElementById( "total");
let count = document.getElementById( "count");
let category = document.getElementById( "category");
let submit = document.getElementById( "submit");
let mood = 'create';
let tmp;


let dataPro = [];

if(localStorage.product != null){
   dataPro = JSON.parse(localStorage.product)
}else{
   dataPro = [];
}

// ---get total ---
function getTotal()
{
   if(price.value != ``){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
   }else{
    let result = total.innerHTML  ;
    total.style.background = "#a00d02";
   }
}

// create product
submit.onclick = function()
{
   let newPro = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),   

   }
    
if(title.value != '' 
   && price.value != ''
    && category.value != '' &&
   newPro.count < 100 ){
     if(mood === 'create'){
      if (+newPro.count > 1) {
  for (let i = 0; i < +newPro.count; i++) {
    dataPro.push(newPro);
  }
} else {
  dataPro.push(newPro);
  clearData()
}
    }else{
      dataPro[ tmp ] = newPro;
      mood = 'create';
      submit.innerHTML = 'create';
      count.style.display = 'block';
    }
    
    
}

    
   
 

   localStorage.setItem("product", JSON.stringify(dataPro) );   

  clearData()
    showData()
} ;

// clear inputs
function clearData(){
   title.value = '';
   price.value = '';
   taxes.value = '';
   ads.value = '';
   discount.value = '';
   total.innerHTML = '';
   count.value = '';
   category.value = '';
}


// read 

function showData(){
   getTotal()
   let table = "";
   for(let i = 0; i < dataPro.length; i++){
      let total = +dataPro[i].price + +dataPro[i].taxes + +dataPro[i].ads - +dataPro[i].discount;  
      table += 
     ` <tr>     
     <td>${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})">update</button></td>
      <td><button onclick="deleteData(${i})">delete</button></td>
     </tr>
`

   }
   document.getElementById("tbody").innerHTML = table;

   let btnDelete = document.getElementById("deleteAll");
   if(dataPro.length > 0){
       btnDelete.innerHTML =
        `
       <button onclick="deleteAll()">Delete All${dataPro.length}</button>
        `
       
   }else{
      btnDelete.innerHTML = ``;
   }

}

  
 



// delete
function deleteData(i){
     dataPro.splice(i,1);
     localStorage.product = JSON.stringify(dataPro);
     showData()
} 



// delete all

function deleteAll(){
   localStorage.clear();
   dataPro.splice(0);
   showData()
}

//  update
function updateData(i){
   title.value = dataPro[i].title;
   price.value = dataPro[i].price;
   taxes.value = dataPro[i].taxes;
   ads.value = dataPro[i].ads;
   discount.value = dataPro[i].discount;
   getTotal()
   count.style.display = "none";
   category.value = dataPro[i].category;
   submit.innerHTML = 'update';
   mood = 'update'; 
   tmp = i ;
   scroll({
      top:0 ,
      behavior:'smooth',

   })
}
showData()

// search
let searchMood = 'title';
function getsearchMood(id)
{
   let search = document.getElementById('search'); 

   if(id == 'searchTitle'){
      searchMood = 'title';
      
   }else{
      searchMood = 'category';
      
   }
   search.placeholder = 'search by '+ searchMood;
search.focus()
search.value = '';
showData()

    
} 

function searchData(value){
   let table = '';
   if(searchMood == 'title'){
   
    for(let i = 0; i< dataPro.length; i++){
      if(dataPro[i].title.includes(value.toLowerCase())){
         table += 
     ` <tr>     
           <td>${i + 1}</td>
           <td>${dataPro[i].title}</td>
           <td>${dataPro[i].price}</td>
           <td>${dataPro[i].taxes}</td>
           <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
           <td>${dataPro[i].total}</td>
           <td>${dataPro[i].category}</td>
           <td><button onclick="updateData(${i})">update</button></td>
           <td><button onclick="deleteData(${i})">delete</button></td>
     </tr>
`
      }
   }
   document.getElementById("tbody").innerHTML = table;
    } 
   
   
   
   
   
   else{
     for(let i = 0; i< dataPro.length; i++){
      if(dataPro[i].category.includes(value.toLowerCase())){
         table += 
     ` <tr>     
           <td>${i + 1}</td>
           <td>${dataPro[i].title}</td>
           <td>${dataPro[i].price}</td>
           <td>${dataPro[i].taxes}</td>
           <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
           <td>${dataPro[i].total}</td>
           <td>${dataPro[i].category}</td>
           <td><button onclick="updateData(${i})">update</button></td>
           <td><button onclick="deleteData(${i})">delete</button></td>
     </tr>
         `
   }
}
   document.getElementById("tbody").innerHTML = table;
} }
 

// clean data
