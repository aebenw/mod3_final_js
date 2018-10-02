document.addEventListener("DOMContentLoaded", () => {

  let submitForm = document.querySelector("#signUpForm")
  const url = `http://localhost:3000`

  submitForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let nameInput = e.target.name.value

    body = {
      name: nameInput
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
  })


})
