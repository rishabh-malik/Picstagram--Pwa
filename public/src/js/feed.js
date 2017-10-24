var shareImageButton = document.querySelector('#share-image-button')
var createPostArea = document.querySelector('#create-post')
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn')

function openCreatePostModal () {
  createPostArea.style.display = 'block';
  //deferring the install app banner
  if(deferredPrompt){
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult){
      console.log(choiceResult.outcome);

      if(choiceResult.outcome==='dismissed'){
        console.log('User cancelled installation');
      }
      else{
        console.log('User added app to homescreen');
      }
    });
    deferredPrompt=null;
  }
}

function closeCreatePostModal () {
  createPostArea.style.display = 'none'
}

shareImageButton.addEventListener('click', openCreatePostModal)

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal)

// function onSaveButtonClicked(){
//   console.log('Clicked');
  //saving the card on save button click
  //cache on demand
  // if('caches' in window){
  //   caches.open('user-requested')
  //     .then(function(cache){
  //       cache.add('https://httpbin.org/get');
  //       cache.add('/src/images/main-image-lg.jpg');
  //     });
  // }
//}

//creating cards dynamically
function createCard(){
  var cardWrapper=document.createElement('div');
  cardWrapper.className='shared-moment-card mdl-card-mdl-shadow--2dp';
  var cardTitle=document.createElement('div');
  cardTitle.className='mdl-card__title';
  cardTitle.style.backgroundImage='/src/images/main-image-lg.jpg';
  cardTitle.style.backgroundSize='cover';
  cardTitle.style.height='180px';
  cardWrapper.appendChild(cardTitle);
  var cardTitleTextElement=document.createElement('h2');
  cardTitleTextElement.className='mdl-card__title-text';
  cardTitleTextElement.textContent='Sans Francisco Trip';
  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText=document.createElement('div');
  cardSupportingText.className='mdl-card__supporting-text';
  cardSupportingText.textContent='In Sans Francisco';
  cardSupportingText.style.textAlign='center';
  //saving data offline for button click
  // var cardSaveButton=document.createElement('button');
  // cardSaveButton.textContent='Save';
  // cardSaveButton.addEventListener('click',onSaveButtonClicked);
  // cardSupportingText.appendChild(cardSaveButton);
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  card.appendChild(cardWrapper);
}

fetch('https://httpbin.org/get')
.then(function(res){
  return res.json();
})
.then(function(data){
  console.log('creating card');
  createCard();
});