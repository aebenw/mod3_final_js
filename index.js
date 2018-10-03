document.addEventListener("DOMContentLoaded", () => {

  const url = "http://localhost:3000"

  const welcomeDiv = document.getElementById("welcome")
  const profileDiv = document.getElementById("profile")
  const signInForm = document.getElementById('signInForm')
  const signUpForm = document.getElementById("signUpForm")
  const signUpButton = document.querySelector("#signUpButton")
  const signInButton = document.querySelector("#signInButton")
  const signUpModal = document.querySelector("#signUpModal")
  const signInModal = document.querySelector("#signInModal")
  const signUpClose = document.querySelector("#signUpClose")
  const signInClose = document.querySelector("#signInClose")

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
    welcomeDiv.style.display = "none"
    profileDiv.style.display = "block"
    profileDiv.dataset.user = user.id
    const paintingUl = document.getElementById('paintings-ul')

    let userName = document.getElementById("name")
    userName.innerText = `Welcome ${user.name}`

    if (user.paintings){
      user.paintings.forEach(painting => {

      let paintingLi = document.createElement('li')
      let paintingImg = document.createElement('img')
      let title = document.createElement('h1')
      let artist = document.createElement('h2')

      paintingImg.src = painting.img_url
      title.innerText = painting.name
      artist.innerText = painting.artist

      paintingLi.append(paintingImg)
      paintingLi.append(title)
      paintingLi.append(artist)
      paintingUl.append(paintingLi)
      })
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
  let paintingLi = document.createElement('li')
  let paintingImg = document.createElement('img')
  let title = document.createElement('h1')
  let artist = document.createElement('h2')
  let paintingBtn = document.createElement('button')

  paintingImg.src = painting.img_url
  paintingImg.style.width ="300"
  paintingImg.style.height ="400"
  title.innerText = painting.name
  artist.innerText = painting.artist

  paintingBtn.innerText = "Add Painting to your Profile"

  paintingBtn.setAttribute("name", painting.id)
  paintingBtn.addEventListener('click', addToProfile)

  paintingLi.append(paintingBtn)
  paintingLi.append(paintingImg)
  paintingLi.append(title)
  paintingLi.append(artist)
  allPaintings.append(paintingLi)
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
