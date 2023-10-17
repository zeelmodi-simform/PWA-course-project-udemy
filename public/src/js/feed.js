var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
var sharedMomentsArea = document.querySelector('#shared-moments');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function (choiceResult) {
      console.log(choiceResult?.outcome);

      if (choiceResult?.outcome === 'dismissed') {
        console.log('user cancelled installation!');
      }
      else {
        console.log('user added to home screen!');
      }
    });
    deferredPrompt = null
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

function createCard() {
  var cardWrapper = document.createElement('div');
  cardWrapper.className = `shared-moment-card mdl-card mdl-shadow--2dp`;
  var cardTitle = document.createElement('div');
  cardTitle.className = `mdl-card__title`;
  cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
  cardTitle.style.backgroundSize = 'cover';
  cardTitle.style.height = '180px';
  cardWrapper.appendChild(cardTitle);

  var carTitleTextElement = document.createElement('h2');
  carTitleTextElement.className = `mdl-card__title-text`;
  carTitleTextElement.textContent = 'San Francisco Trip';
  carTitleTextElement.style.color = 'white';
  cardTitle.appendChild(carTitleTextElement);

  var carSupportingText = document.createElement('div');
  carSupportingText.className = `mdl-card__supporting-text`;
  carSupportingText.textContent = `In San Francisco`;
  carSupportingText.style.textAlign = 'center';
  cardWrapper.appendChild(carSupportingText);

  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper)
}

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

fetch(`https://httpbin.org/get`).then((res) => {
  return res.json();
}).then((data) => {
  createCard()
});