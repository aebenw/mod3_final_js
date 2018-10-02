document.addEventListener("DOMContentLoaded", () => {

  const url = "http://localhost:3000/users"
  const signInForm = document.getElementById('signInForm')
  const signUpForm = document.getElementById("signUpForm")

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
    handleSignIn(nameInput)
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
