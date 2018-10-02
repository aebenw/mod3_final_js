document.addEventListener("DOMContentLoaded", () => {

  const url = "http://localhost:3000/users"

  const welcomeDiv = document.getElementById("signup-form")
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
    fetch(url+ `/${name}`)
    .then(res => res.json())
    .then(res => renderProfile(res))
  }


    function postUser(body){
    fetch(url, {
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
    const paintingUl = document.getElementById('paintings-ul')
    debugger
    let userName = document.getElementById("name")
    userName.innerText = `Welcome ${user.name}`
debugger
    if (user.paintings){
      user.paintings.forEach(painting => {
        debugger
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
    })
  }


  // function renderProfile(user){
  //   signIn.style.display = "none"
  //   debugger
  //   let userName = document.getElementById("name")
  //   userName.innerText = user.name
  //
  //   // if (user.paintings){
  //   //   user.paintings.forEach(painting => (){
  //   //     painting
  //   //   })
  //   }
  //
  // }

})
