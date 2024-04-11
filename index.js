const pikachuButton = document.querySelector("#pikachu")
const pokemonCard = document.querySelector("#card")
const nameField = document.querySelector("#name")
const customButton = document.querySelector("#custom")
const nameHeading = document.querySelector("h2")
const cardImage = document.querySelector("#cardImage")
const randomButton = document.querySelector("#random")

//Pokemon Card Info variables
const typeInfo = document.querySelector("#type")
const hpInfo = document.querySelector("#HP")
const heightInfo = document.querySelector("#height")
const weightInfo = document.querySelector("#weight")
const abilityOneInfo = document.querySelector("#abilityOne")
const abilityTwoInfo = document.querySelector("#abilityTwo")

const boxOne = document.querySelector("#slot1")
const slotOne = document.querySelector("#name1")
const imageOne = document.querySelector("#image1")

const boxTwo = document.querySelector("#slot2")
const slotTwo = document.querySelector("#name2")
const imageTwo = document.querySelector("#image2")

const boxThree = document.querySelector("#slot3")
const slotThree = document.querySelector("#name3")
const imageThree = document.querySelector("#image3")

const boxFour = document.querySelector("#slot4")
const slotFour = document.querySelector("#name4")
const imageFour = document.querySelector("#image4")

const boxFive = document.querySelector("#slot5")
const slotFive = document.querySelector("#name5")
const imageFive = document.querySelector("#image5")

const boxSix = document.querySelector("#slot6")
const slotSix = document.querySelector("#name6")
const imageSix = document.querySelector("#image6")

const addToTeamButton = document.querySelector("#add")

let slotCount = 0
let currentName
let currentImage

customButton.addEventListener("click", () => {
  const name = nameField.value.trim()
  if (name) {
    fetchInfoFromApi(name)
    nameField.value = ""
    showPokemonCard()
  }
})

async function fetchInfoFromApi(name) {
  showPokemonCard()
  const encodedName = encodeURIComponent(name)
  const url = `https://pokeapi.co/api/v2/pokemon/${encodedName}`
  const response = await fetch(url)
  if (response.status >= 400) {
    document.querySelector("#error").showModal()
    return
  }
  const info = await response.json()
  currentName = capitalize(info.name)
  currentImage = info.sprites.front_shiny
  nameHeading.textContent = `${currentName}`
  cardImage.src = info.sprites.front_shiny
  cardImage.alt = currentName
  //infoArea.textContent = JSON.stringify(info, null, 2)
  typeInfo.textContent = `Type: ${capitalize(info.types[0].type.name)}`
  hpInfo.textContent = `HP: ${info.stats[0].base_stat}`
  weightInfo.textContent = `Weight: ${info.weight} lbs`
  heightInfo.textContent = `Height: ${(info.height * 10)} cm` //was originally in decimeters -> now in centimeters
  abilityOneInfo.textContent = `Ability #1: ${capitalize(info.abilities[0].ability.name)}`
  abilityTwoInfo.textContent = `Ability #2: ${capitalize(info.abilities[1].ability.name)}`
}

randomButton.addEventListener('click', async e => {
  const randomOffset = Math.floor(Math.random() * 1280)
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${randomOffset}&limit=1`
  const response = await fetch(url)
  const info = await response.json()
  fetchInfoFromApi(info.results[0].name)
})

addToTeamButton.addEventListener("click", async e => {
  slotCount += 1
  if (slotCount === 1) {
    imageOne.src = currentImage
    slotOne.textContent = currentName
    boxOne.style.display = "inline"
  }
  if(slotCount === 2 ) {
    imageTwo.src = currentImage
    slotTwo.textContent = currentName
    boxTwo.style.display = "inline"
  }
  if(slotCount === 3 ) {
    imageThree.src = currentImage
    slotThree.textContent = currentName
    boxThree.style.display = "inline"
  }
  if(slotCount === 4 ) {
    imageFour.src = currentImage
    slotFour.textContent = currentName
    boxFour.style.display = "inline"
  }
  if(slotCount === 5 ) {
    imageFive.src = currentImage
    slotFive.textContent = currentName
    boxFive.style.display = "inline"
  }
  if(slotCount === 6 ) {
    imageSix.src = currentImage
    slotSix.textContent = currentName
    boxSix.style.display = "inline"
  }
})

function showPokemonCard () {
  pokemonCard.style.backgroundColor = "darkblue"
  addToTeamButton.style.display = "inline"
}

function capitalize(s) {
  s = s.substring(0,1).toUpperCase() + s.substring(1)
  for (let i = 0; i < s.length; i++) {
    if (s.substring(i, i+1) === "-") {
      s = s.substring(0, i) + " " + capitalize(s.substring(i + 1))
    }
  }
  return s
}