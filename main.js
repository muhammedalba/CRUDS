let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');

let tmp ;
let mood ="creat";



//get totl حساب سعر المنتج

function getTotal() {
  if(price.value !="") {
let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;

   total.innerHTML = result;
   total.style.background="#040";
  }else{total.innerHTML="";
  total.style.background="rgb(165, 12, 12)";}
}

//creat product انشاء منتج 
let datapro;////5
if(localStorage.product != null){////4عدم مسح منتجات عند تحميل الصفحة
    datapro=JSON.parse(localStorage.product)}
    else{
 datapro =[];}////1
////2
submit.onclick =function(){
    let newpro ={
title:title.value.toLowerCase(),
price:price.value,
ads:ads.value,
taxes:taxes.value,
discount:discount.value,
total:total.innerHTML,
count:count.value,
category:category.value.toLowerCase(),

    }
    if(title.value != "" && price.value !=""){ 
       if(mood==="creat"){ 
              if(newpro.count > 1 && newpro.count <101){//countانشاء اكثر من منتج 

for(let i= 0 ; i < newpro.count ; i++){
   datapro.push(newpro);}

          }

    else { datapro.push(newpro);}
 
}
else{datapro[tmp]=newpro;
  mood="creat";
  submit.innerHTML="creat";
  count.style.display="block";

 
}}else{}

 showdata()
  cleardata()
  total.style.background="rgb(165, 12, 12)";




   // save localstorage حفظ المنتجات في لوكال ستورج
////3حفظ منتجات 

localStorage.setItem('product', JSON.stringify(datapro)),
    
    cleardata()
    showdata()
    total.style.background="rgb(165, 12, 12)";
}


//clear inputs تنظيف مربعات من المعلومات

function cleardata(){

title.value ="";
price.value ="";
ads.value ="";
taxes.value ="";
discount.value ="";
total.innerHTML ="";
count.value ="";
category.value ="";

}





// read عرض المعلومات

function showdata(){

let table="";
for(i =0; i < datapro.length; i++){
    table +=`<tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick=" updatedata(${i})" id="update">update</button></td>
    <td><button onclick=" deletdata(${i})" id="delete">delete</button></td>   
</tr>`;

}
document.getElementById("tbody").innerHTML= table;
let btndelet =document.getElementById('deletall')
if(datapro.length > 0){
    btndelet.innerHTML= `<button onclick="deletall()">deleteAll(${datapro.length})</button>`  
  }  
else{ btndelet.innerHTML='';}


}

showdata()



//deleteحذف منجات
function deletdata(i){
datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);

showdata()
}
///حذف جميع المنتجات اذا كان هناك منتجات يظهر الزر
function deletall(){
  localStorage.clear() ;  ///// مسح بيانات من لوكال ستريج
datapro.splice(0);
showdata();
}

//updateتعديل منتجات
function updatedata(i){
title.value = datapro[i].title;
price.value = datapro[i].price;
taxes.value = datapro[i].taxes;
ads.value = datapro[i].ads;
discount.value = datapro[i].discount;

getTotal()
count.style.display="none";
submit.innerHTML ="updeta";


category.value = datapro[i].category;

mood="update";
tmp=i;
scroll({///سحب الشاشة للاعلى عند ضغط على تعديل
  top:0,
  behavior:"smooth"
})
}



//search بحث عن منتجات

let searchmood="title";


function getsearcmood(id){

let search= document.getElementById("search")


if(id==="searchTitle"){searchmood="title";
}
else{searchmood="category";
}
search.placeholder ="searech by"+ searchmood;
search.focus()///فتح مربع البحثعند الضغط على مربعات البحث
search.value ="";
showdata()
}






function searchdata(value){
  let table =""
  for(i=0 ; i < datapro.length ; i++){
if(searchmood == "title"){

if(datapro[i].title.includes(value.toLowerCase())){


  table +=`<tr>
  <td>${i}</td>
  <td>${datapro[i].title}</td>
  <td>${datapro[i].price}</td>
  <td>${datapro[i].taxes}</td>
  <td>${datapro[i].ads}</td>
  <td>${datapro[i].discount}</td>
  <td>${datapro[i].total}</td>
  <td>${datapro[i].category}</td>
  <td><button onclick=" updatedata(${i})" id="update">update</button></td>
  <td><button onclick=" deletdata(${i})" id="delete">delete</button></td>   
</tr>`;


document.getElementById("tbody").innerHTML= table;

}


}

else{{
  if(datapro[i].category.includes(value.toLowerCase())){
  
  
    table +=`<tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick=" updatedata(${i})" id="update">update</button></td>
    <td><button onclick=" deletdata(${i})" id="delete">delete</button></td>   
  </tr>`;
  
  
  }}}

document.getElementById("tbody").innerHTML= table;

 }}



//clean data تنقية معلومات عدم انشاء منتجات بحقول فارغة




