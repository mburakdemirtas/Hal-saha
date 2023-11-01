document.addEventListener('DOMContentLoaded', () =>{
  const form= document.getElementById('registrar');//const because we wont be assigning any different value to form
  const input= form.querySelector('input');//reads what was put into form
  const mainDiv= document.querySelector('.main');
  const ul= document.getElementById('invitedList');
  
  const div= document.createElement('div');
  const filterLabel= document.createElement('label');
  const filterCheckBox= document.createElement('input');
    
  //filterLabel.textContent= "Hide those who haven't responded.";
  //filterCheckBox.type= 'checkbox';
  //div.appendChild(filterLabel);
  //div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked= e.target.checked;
    const lis= ul.children;
    
    
    
    if (isChecked){
      for(let i=0; i<lis.length;i++){
      let li= lis[i];
      let confirmedLabel=li.firstChild.nextSibling;
      if (li.className=== 'responded'){
        li.style.display=''; li.style.height='70px'; 
        confirmedLabel.style.display='none';}
      else {li.style.display='none';}}}
    else {
      for(let i=0; i<lis.length;i++){
      let li= lis[i];
      let confirmedLabel=li.firstChild.nextSibling;
      li.style.display='';li.style.height='81px';
      confirmedLabel.style.display='';}}
                                  
  });
  
  function createLi(text) {
    function createElement(elementName, property, value){
    const element= document.createElement(elementName);
    element[property]= value;
    return element;}
    
  function appendToLi(elementName, property, value){
    const element= createElement(elementName, property, value);
    li.appendChild(element);
  }
    
  const li= document.createElement('li');
 
  appendToLi('span', 'textContent', text);
  
  const label= createElement('label', 'textContent', 'Confirmed');
  
  const checkbox= createElement('input', 'type', 'checkbox');
  
  label.appendChild(checkbox);
  li.appendChild(label);
  
  appendToLi('button', 'textContent', 'Düzenle');
  
  appendToLi('button', 'textContent', 'Sil');
  
  return li;
  }
  
  form.addEventListener('submit', (e) => {//submit event listener instead of click so it runs if someone clicks enter after typing
    e.preventDefault();//stops page from trying to submit to server and reloading when e happens
    if (input.value===''){input.placeholder="Lütfen oyuncu adı giriniz.";
      input.className='error';}
    else{
    const text= input.value;
    input.value='';//clears form after submit
    input.placeholder="Oyuncu adı giriniz";
    input.classList.remove("Hata");
    const li= createLi(text);
    
    ul.appendChild(li);
      
    }
  });
    
  ul.addEventListener('change', (e) => {
    const checkbox= event.target;
    const checked= checkbox.checked;
    const listItem= checkbox.parentNode.parentNode;//goes to label then li
    
    if(checked){listItem.className='responded'} else {listItem.className='';}//changes className for CSS styling changes
  
  });
    
  ul.addEventListener('click', (e) => {//removes li on button click
    if(e.target.tagName === 'BUTTON'){
      const button= e.target;
      const li = e.target.parentNode;
      const ul = li.parentNode;
    
      if(button.textContent === 'Sil'){
        ul.removeChild(li);}
      else if(button.textContent === 'Düzenle'){
        const span= li.firstElementChild;
        const input= document.createElement('input');
        input.type='text';
        input.value= span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent= 'Kaydet';}
      else if(button.textContent === 'Kaydet'){
        const input=li.firstElementChild;
        const span= document.createElement('span');
        span.textContent= input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent= 'Düzenle';}
  }
  });  
    
});//end DOMContentListener