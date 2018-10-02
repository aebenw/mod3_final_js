document.addEventListener("DOMContentLoaded", () => {

  const url = "http://localhost:3000/users"

  const welcomeDiv = document.getElementById("signup-form")
  const signIn = document.getElementById('sign-in')
  const signUp = document.getElementById("signUpForm")



  signUp.addEventListener("submit", (e) => {
    e.preventDefault()
    let nameInput = e.target.name.value

    let newInfo = {
      name: nameInput
    }
    postUser(newInfo)
  })

  signIn.addEventListener("submit", (e) => {
    e.preventDefault()
    let nameInput = e.target.name.value
    getUser(nameInput)
  })


  function getUser(name){
    fetch(url+ `/${name}`)
    .then(res => res.json())
    .then(res => console.log(res))
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

  // function renderProfile(user){
  //   signIn.style.display = "none"
  //   debugger
  //   let userName = document.getElementById("name")
  //   userName.innerText = user.name
  //
  //   if (user.paintings){
  //     user.paintings.forEach(painting => (){
  //       painting
  //     })
  //   }
  //
  // }










})
