document.addEventListener("DOMContentLoaded", () => {

  const url = "http://localhost:3000"

  const welcomeDiv = document.getElementById("welcome")
  const profileDiv = document.getElementById("profile")
  const allPaintingDiv = document.getElementById("allPaintings")

  const signInForm = document.getElementById('signInForm')
  const signUpForm = document.getElementById("signUpForm")
  const signUpButton = document.querySelector("#signUpButton")
  const signInButton = document.querySelector("#signInButton")
  const signUpModal = document.querySelector("#signUpModal")
  const signInModal = document.querySelector("#signInModal")
  const signUpClose = document.querySelector("#signUpClose")
  const signInClose = document.querySelector("#signInClose")

  const homeBtn = document.getElementById("homeBtn")
  const allBtn = document.getElementById("allBtn")
  const navbar = document.getElementById("navbar")

  signUpButton.addEventListener("click", (e) => {
    signUpModal.style.display = "block"
  })

  signInButton.addEventListener("click", (e) => {
    signInModal.style.display = "block"
  })

  signUpClose.onclick = function() {
    signUpModal.style.display = "none"
  }

  signInClose.onclick = function() {
    signInModal.style.display = "none"
  }

  window.onclick = function(event) {
    if (event.target == signInModal) {
      signInModal.style.display = "none"
    }
    if (event.target == signUpModal) {
        signUpModal.style.display = "none"
    }
  }

  homeBtn.addEventListener('click', function(e){
    e.preventDefault
    if (profileDiv.style.display === "none"){
      profile.style.display = "block"
      allPaintingDiv.style.display = "none"
    }
  })

  allBtn.addEventListener('click', function(e){
    e.preventDefault
    if (allPaintingDiv.style.display === "none"){
      allPaintingDiv.style.display = "block"
      profileDiv.style.display = "none"
    }
  })

  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let nameInput = e.target.name.value

    let newInfo = {
      name: nameInput
    }
    postUser(newInfo)
  })

  signInForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let nameInput = e.target.name.value
    getUser(nameInput)
    signInForm.name.value = ""
  })


  function getUser(name){
    fetch(url+ `/users/${name}`)
    .then(res => res.json())
    .then(res => renderProfile(res))
  }


    function postUser(body){
    fetch(url + '/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
      }).then(res => res.json())
      .then(res => renderProfile(res))
    //************** NEED TO FIGURE OUT HOW TO FIELD AN ERROR********************//
    // .catch(function(){
    //   debugger
    //   console.log('Error:')
    // })
  }

  function renderProfile(user){
    debugger
    welcomeDiv.style.display = "none"
    navbar.style.display = "block"
    profileDiv.style.display = "block"
    profileDiv.dataset.user = user.id
    const paintingUl = document.getElementById('paintings-ul')

    let userName = document.getElementById("name")
    userName.innerText = `Welcome ${user.name}`

    if (user.paintings){
      user.paintings.forEach(painting => {


        let paintingCard = document.createElement('div')
        paintingCard.setAttribute("class", "card")
        paintingCard.setAttribute("style", "width: 18rem;")

        let paintingImg = document.createElement('img')

        let paintingInfoDiv = document.createElement('div')
        paintingInfoDiv.setAttribute("class", "card-body")

        let title = document.createElement('h4')
        title.setAttribute("class", "card-title")

        let artist = document.createElement('h5')
        artist.setAttribute("class", "card-text")

        let paintingBtn = document.createElement('a')
        paintingBtn.setAttribute("class", "btn btn-primary" )

        paintingImg.setAttribute("class", "card-img-top")
        paintingImg.src = painting.img_url
        paintingImg.style.width ="300"
        paintingImg.style.height ="400"
        title.innerText = painting.name
        artist.innerText = painting.artist

        paintingBtn.innerText = "Delete From your Profile"

        paintingBtn.setAttribute("name", painting.id)
        paintingBtn.addEventListener('click', addToProfile)


        paintingInfoDiv.append(title)
        paintingInfoDiv.append(paintingBtn)
        paintingInfoDiv.append(artist)
        paintingCard.append(paintingInfoDiv)
        paintingCard.append(paintingImg)

        profileDiv.append(paintingCard)
      })
    } else {
      let noPaintings = document.createElement("h3")
      noPaintings.innerText = "No paintings, with your profile"
      }
  }


function getAllPaintings(){
  fetch(url + "/paintings/?_limit=20")
  .then(res => res.json())
  .then(renderAllPaintings)
}
getAllPaintings()


function renderAllPaintings(data){
  const allPaintings = document.getElementById("allPaintingsUl")

  data.forEach(painting => {

  let paintingCard = document.createElement('div')
  paintingCard.setAttribute("class", "card")
  paintingCard.setAttribute("style", "width: 18rem;")

  let paintingImg = document.createElement('img')

  let paintingInfoDiv = document.createElement('div')
  paintingInfoDiv.setAttribute("class", "card-body")

  let title = document.createElement('h4')
  title.setAttribute("class", "card-title")

  let artist = document.createElement('h5')
  artist.setAttribute("class", "card-text")

  let paintingBtn = document.createElement('a')
  paintingBtn.setAttribute("class", "btn btn-primary" )

  paintingImg.setAttribute("class", "card-img-top")
  paintingImg.src = painting.img_url
  paintingImg.style.width ="300"
  paintingImg.style.height ="400"
  title.innerText = painting.name
  artist.innerText = painting.artist

  paintingBtn.innerText = "Add Painting to your Profile"

  paintingBtn.setAttribute("name", painting.id)
  paintingBtn.addEventListener('click', addToProfile)


  paintingInfoDiv.append(title)
  paintingInfoDiv.append(paintingBtn)
  paintingInfoDiv.append(artist)
  paintingCard.append(paintingInfoDiv)
  paintingCard.append(paintingImg)

  allPaintings.append(paintingCard)
})
let images = document.querySelectorAll("img[src='null']")
// debugger
images.forEach(img => img.remove())

  }

function addToProfile(e){

  let paintingId = e.target.name
  let userId = profileDiv.dataset.user

  body = {
	"user_id": `${paintingId}`,
	"painting_id": `${userId}`
  }
  debugger
  makeUserPainting(body)

}

function makeUserPainting(body){
  debugger
  fetch(url + "/user_paintings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
    .then(console.log)

}



})
