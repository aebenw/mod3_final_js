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
    // if (name.includes(" ")){
    //    name = name.split(' ').join('+')
    //  }
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
    }

  }










})
