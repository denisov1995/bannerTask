import './style.css';

const unlimitedAccess = document.querySelector('h1')
const checkboxWrapper = document.querySelector('.checkbox-wrapper')
const cross = document.querySelector('.cross')
const bestOffer = document.querySelector('.best-offer')
const yearOfferTitle = document.querySelector('.yearly .offer-title')
const year = document.querySelector('.yearly')
const weekOfferTitle = document.querySelector('.week .offer-title')
const week = document.querySelector('.week')
const offerSubtitle = document.querySelector('.offer-subtitle')
const pricesPerWeek = document.querySelectorAll('.price-per-week')
const continueButton = document.querySelector('.continue')
const selectBoxOption = document.querySelectorAll('.select-box__option')
const termsOfUse = document.querySelector('.terms-of-use')
const privacyPolicy = document.querySelector('.privacy-policy')
const restore = document.querySelector('.restore')
const ultimatedArt = document.querySelector('.cards__card_unlimited-art p')
const exclusiveStyles = document.querySelector('.cards__card_exclusive-styles p')
const magicAvatars = document.querySelector('.cards__card_magic-avatars  p')
const selectBox = document.querySelector('.select-box');
const box = document.querySelector('.select-box__current');
const values = document.querySelectorAll('.select-box__value');
const listOfLanguages = { 'de': 'de', 'en': 'en', 'es': 'es', 'fr': 'fr', 'ja': 'ja', 'pt': 'pt' }
const prices = ['$39.99', '$0.48', '$6.99']
const [pricePerYear, priceOfYearlyAccess, priceOfWeeklyAccess] = prices
const footer = document.querySelector('footer')
console.log(navigator);
let firstClick = true

changeLanguage()
box.addEventListener('click', (e) => {
  let value = e.target.closest('.select-box__value')
  if (!value) return;
  if (value.childNodes[1].checked && !firstClick) {
    firstClick = true
    changeLanguage(value.childNodes[1].nextElementSibling.nextElementSibling.innerHTML)
    return
  }
  firstClick = false
})

async function changeLanguage(changeLang = '') {
  let currentLang = changeLang.toLowerCase() || (listOfLanguages[navigator.language] || 'en')

  if (location.search) {
    currentLang = location.search.split('=')[1]
  }

  let data = await import(`./languages/${currentLang}.json`);

  values.forEach(el => {
    if (el.lastChild.previousSibling.innerHTML.toLowerCase() === currentLang) {
      el.firstChild.nextSibling.checked = 'true'
    }
  })

  currentLang === 'fr' ? footer.style.fontSize = "10px" : footer.style.fontSize = "12.5px"
  currentLang === 'es' || currentLang === 'pt' ? magicAvatars.style.left = '3px' : magicAvatars.style.left = '7px'

  function changeStyles() {

    unlimitedAccess.style.fontSize = '42px'
    continueButton.style.marginBottom = '44px'
    if (currentLang === 'ja') {
      unlimitedAccess.style.fontSize = '30px'
      continueButton.style.marginBottom = '38px'
    }
    
    switch (innerWidth) {
      case 320:
        unlimitedAccess.style.marginTop = '55px';
        cross.style.top = '38px'
        year.style.height = '46px';
        week.style.height = '46px';
        continueButton.style.height = '46px';
        continueButton.style.marginBottom = '24px';
        yearOfferTitle.style.fontSize = '12px'
        offerSubtitle.style.fontSize = '12px'
        weekOfferTitle.style.fontSize = '12px'
        pricesPerWeek[0].style.fontSize = '12px'
        pricesPerWeek[1].style.fontSize = '12px'
        selectBox.style.top = '20px'
        selectBox.style.right = '10px'

        if (currentLang === 'de' || currentLang === 'pt' || currentLang === 'fr') {
          unlimitedAccess.style.marginTop = '8px';
          bestOffer.style.top = '-13px'
          footer.style.fontSize = '10px'
        }

        break
      case 390:
        unlimitedAccess.style.marginTop = '226px';
        if (currentLang === 'de') {
          unlimitedAccess.style.marginTop = '174px';
        }
        break
      case 414:
        unlimitedAccess.style.marginTop = '124px';
        week.style.marginBottom = '20px'
        continueButton.style.marginBottom = '35px';
        if (currentLang === 'de') {
          unlimitedAccess.style.marginTop = '76px';
        }
        break
      case 428:
        unlimitedAccess.style.marginTop = '255px';
        week.style.marginBottom = '32px'

        if (currentLang === 'de') {
          unlimitedAccess.style.marginTop = '208px';
          week.style.marginBottom = '32px'
        }
        break
      case 430:
        unlimitedAccess.style.marginTop = '266px';
        week.style.marginBottom = '32px'

        if (currentLang === 'de') {
          unlimitedAccess.style.marginTop = '218px';
          week.style.marginBottom = '32px'
        }
        break
      default:
        unlimitedAccess.style.marginTop = '205px'

        if (currentLang === 'de') {
          unlimitedAccess.style.marginTop = '152px';
        }
    }
  }

  changeStyles()

  unlimitedAccess.innerHTML = data['Get Unlimited <br>Access']
  bestOffer.innerHTML = data['BEST OFFER']
  yearOfferTitle.innerHTML = data['YEARLY ACCESS']
  offerSubtitle.innerHTML = data['Just {{price}} per year'].replace('{{price}}', pricePerYear)
  pricesPerWeek[0].innerHTML = data['{{price}} <br>per week'].replace('{{price}}', priceOfYearlyAccess)
  pricesPerWeek[1].innerHTML = data['{{price}} <br>per week'].replace('{{price}}', priceOfYearlyAccess)
  weekOfferTitle.innerHTML = data['WEEKLY ACCESS']
  continueButton.innerHTML = data['Continue']
  termsOfUse.innerHTML = data['Terms of Use']
  privacyPolicy.innerHTML = data['Privacy Policy']
  restore.innerHTML = data['Restore']
  ultimatedArt.innerHTML = data['Unlimited Art <br>Creation']
  exclusiveStyles.innerHTML = data['Exclusive <br>Styles']
  magicAvatars.innerHTML = data['Magic Avatars <br>With 20% Off']
}

selectBoxOption.forEach(el => el.addEventListener('click', (e) => {
  let path = e.target.id;
  window.history.pushState({ route: path }, "state", path);
}))


checkboxWrapper.addEventListener('click', (e) => {
  let radioInput = e.target.closest('.modern-radio')
  if (!radioInput) return;
  radioInput.closest('.checkbox-wrapper').action = radioInput.dataset.href
  continueButton.disabled = false
})

