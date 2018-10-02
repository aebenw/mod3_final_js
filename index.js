document.addEventListener("DOMContentLoaded", () => {

  const url = "http://localhost:3000/users"

  // ********* DOM ELEMENTS ********** //
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
    signUpForm.name.value = ""
  })

  signInForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let nameInput = e.target.name.value
    handleSignIn(nameInput)
    signInForm.name.value = ""
  })

  function postUser(body){
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
    .then(console.log)
    //************** NEED TO FIGURE OUT HOW TO FIELD AN ERROR********************//
    // .catch(function(){
    //   debugger
    //   console.log('Error:')
    // })
  }

  function handleSignIn(nameInput) {
    fetch(url)
    .then(resp => resp.json())
    .then(userArray => {
      return userArray.forEach(user => {
        if(user.name === nameInput) {
          console.log(user)
        }
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
