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

  let matrixPics = [];

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
    welcomeDiv.style.display = "none"
    navbar.style.display = "block"
    profileDiv.style.display = "block"
    profileDiv.dataset.user = user.id
    const paintingUl = document.getElementById('paintings-ul')

    let userName = document.getElementById("name")
    userName.innerText = `Welcome ${user.name}`
    if (user.paintings.length !== 0){
      user.paintings.forEach(painting => {

//PARENT ELEMENT//
        let paintingCard = document.createElement('div')
        paintingCard.setAttribute("class", "card")
        paintingCard.setAttribute("style", "width: 18rem;")
//PAINTING IMG//
        let paintingImg = document.createElement('img')
//DIV FOR NAME/ARTIST//
        let paintingInfoDiv = document.createElement('div')
        paintingInfoDiv.setAttribute("class", "card-body")

        let title = document.createElement('h4')
        title.setAttribute("class", "card-title")

        let artist = document.createElement('h5')
        artist.setAttribute("class", "card-text")
//DELETE/MATRIX BTNS//
        let paintingBtn = document.createElement('a')
        paintingBtn.setAttribute("class", "btn btn-primary" )
        let galleryBtn = document.createElement('a')
        galleryBtn.setAttribute("class", "btn btn-primary" )

        paintingImg.setAttribute("class", "card-img-top")
        paintingImg.src = painting.img_url
        paintingImg.name = "image"
        title.innerText = painting.name
        artist.innerText = painting.artist

        let buttonDiv = document.createElement('div')

        paintingBtn.setAttribute("name", painting.id)
        paintingBtn.innerText = "Delete"
        paintingBtn.addEventListener('click', addToProfile)

        galleryBtn.setAttribute("name", painting.img_url)
        galleryBtn.dataset.pId = painting.id
        galleryBtn.innerText = "Test in Gallery"
        galleryBtn.addEventListener('click', renderGallery)


        buttonDiv.append(galleryBtn)
        buttonDiv.append(paintingBtn)


        paintingInfoDiv.append(title)
        paintingInfoDiv.append(buttonDiv)
        // paintingInfoDiv.append(galleryBtn)
        paintingInfoDiv.append(artist)
        paintingCard.append(paintingInfoDiv)
        paintingCard.append(paintingImg)
        paintingCard.setAttribute("name", painting.id)

        profileDiv.append(paintingCard)


      })
    } else {
      let noPaintings = document.createElement("h3")
      noPaintings.innerText = "Choose Some Paintings you Fancy"
      profileDiv.append(noPaintings)

      }
      removeUserPaintings()

  }


function getAllPaintings(){
  fetch(url + "/paintings/?_limit=20")
  .then(res => res.json())
  .then(renderAllPaintings)
}
getAllPaintings()


function renderAllPaintings(data){
  const allPaintings = document.getElementById("allPaintings")

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

  let btnDiv = document.createElement('div')
  let paintingBtn = document.createElement('a')
  paintingBtn.setAttribute("class", "btn btn-primary" )



  paintingImg.setAttribute("class", "card-img-top")
  paintingImg.src = painting.img_url
  paintingImg.name = "image"

  paintingImg.style.width ="300"
  paintingImg.style.height ="400"
  title.innerText = painting.name
  artist.innerText = painting.artist

  paintingBtn.innerText = "Add Painting to your Profile"
  paintingBtn.setAttribute("name", painting.id)
  paintingBtn.addEventListener('click', addToProfile)
  btnDiv.append(paintingBtn)


  paintingInfoDiv.append(title)
  paintingInfoDiv.append(btnDiv)
  paintingInfoDiv.append(artist)
  paintingCard.append(paintingInfoDiv)
  paintingCard.append(paintingImg)
  paintingCard.setAttribute("name", painting.id)

  allPaintings.append(paintingCard)
})
let images = document.querySelectorAll("img[src='null']")
// debugger
images.forEach(img => img.remove())

  }

function addToProfile(e){
//---------------optomistic rendering-------------------//
  e.preventDefault()
  //------------ Create Matrix Btn -------------//
  let imageLink = e.target.parentElement.parentElement.parentElement.querySelector('img').src
  let galleryBtn = document.createElement('a')
  galleryBtn.setAttribute("class", "btn btn-primary" )
  galleryBtn.setAttribute("name", imageLink)
  galleryBtn.innerText = "Test in Gallery"
  galleryBtn.addEventListener('click', renderGallery)
  e.target.parentElement.append(galleryBtn)
  //--------------------------------------------//
  e.target.innerText = "Delete"
  let newPainting = e.target.parentElement.parentElement.parentElement;
  profileDiv.append(newPainting)

//------------ upload to db -----------------//

  let paintingId = e.target.name
  let userId = profileDiv.dataset.user

  body = {
	"user_id": `${userId}`,
	"painting_id": `${paintingId}`
  }
  makeUserPainting(body)

}

function makeUserPainting(body){
  fetch(url + "/user_paintings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
    .then(console.log)

}

// var sourcePoints;

function renderGallery(){

  var imgMatrix = document.getElementById("imgMatrix")
  var margin = {top: 50, right: 280, bottom: 50, left: 280},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var transform = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(function(p, v) {
    return v + "transform" in document.body.style ? v : p; }) + "transform";

   sourcePoints = [[0, 0], [width, 0], [width, height], [0, height]],
      targetPoints = [[0, 0], [width, 0], [width, height], [0, height]];

  d3.select(imgMatrix).selectAll("svg")
      .data(["transform", "flat"])
    .enter().append("svg")
      .attr("id", function(d) { return d; })
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("id", `${event.target.dataset.pId}`)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var svgTransform = d3.select("#transform")
      .style(transform + "-origin", margin.left + "px " + margin.top + "px 0");

  var svgFlat = d3.select("#flat");


  d3.selectAll("svg")
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let id = "#" + event.target.dataset.pId
let gArr = svgTransform.selectAll('g')[0]
let image = document.createElement('image')


svgTransform.selectAll("g").filter(":last-child").append("image")
  .attr("xlink:href", `${event.target.name}`)
  .attr("width", width)
  .attr("height", height);


  svgTransform.selectAll('g').selectAll(".line--x")
    .data(d3.range(0, width + 1, 40))
  .enter().append("line")
    .attr("class", "line line--x")
    .attr("x1", function(d) { return d; })
    .attr("x2", function(d) { return d; })
    .attr("y1", 0)
    .attr("y2", height);

  svgTransform.selectAll('g').selectAll(".line--y")
    .data(d3.range(0, height + 1, 40))
  .enter().append("line")
    .attr("class", "line line--y")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", function(d) { return d; })
    .attr("y2", function(d) { return d; });

var handle = svgFlat.select("g").selectAll(".handle")
        .data(targetPoints)
      .enter().append("circle")
        .attr("class", "handle")
        .attr("transform", function(d) { return "translate(" + d + ")"; })
        .attr("r", 7)
        .call(d3.behavior.drag()
          .origin(function(d) { return {x: d[0], y: d[1]}; })
          .on("drag", dragged));

          d3.selectAll(".imgManipulator")
              .datum(function(d) { return JSON.parse(this.getAttribute("data-targets")); })
              .on("click", clicked)
              .call(transformed);

          function clicked(d) {
            d3.transition()
                .duration(750)
                .tween("points", function() {
                  var i = d3.interpolate(targetPoints, d);
                  return function(t) {
                    handle.data(targetPoints = i(t)).attr("transform", function(d) { return "translate(" + d + ")"; });
                    transformed();
                  };
                });
          }

          function dragged(d) {
            d3.select(this).attr("transform", "translate(" + (d[0] = d3.event.x) + "," + (d[1] = d3.event.y) + ")");
            transformed();
          }

          function transformed() {
            for (var a = [], b = [], i = 0, n = sourcePoints.length; i < n; ++i) {
              var s = sourcePoints[i], t = targetPoints[i];
              a.push([s[0], s[1], 1, 0, 0, 0, -s[0] * t[0], -s[1] * t[0]]), b.push(t[0]);
              a.push([0, 0, 0, s[0], s[1], 1, -s[0] * t[1], -s[1] * t[1]]), b.push(t[1]);
            }

            var X = solve(a, b, true), matrix = [
              X[0], X[3], 0, X[6],
              X[1], X[4], 0, X[7],
                 0,    0, 1,    0,
              X[2], X[5], 0,    1
            ].map(function(x) {
              return d3.round(x, 6);
            });

            svgTransform.style(transform, "matrix3d(" + matrix + ")");
          }
}


function removeUserPaintings() {

  let userPaintings =  Array.from(profileDiv.querySelectorAll(".card"))
  let profPaintingId = userPaintings.map(p => p.attributes.name.value);
  let allArr = allPaintingDiv.querySelectorAll(".card")

  allArr.forEach(function(p){
  	if (profPaintingId.includes(p.attributes.name.value)){
      p.remove()
    }
  })


}



})
