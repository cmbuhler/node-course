console.log('Client Javascript is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('#search')
const line1 = document.querySelector('#msg-line1')
const line2 = document.querySelector('#msg-line2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    line1.innerHTML = "Loading..."
    line2.innerHTML = ""
    fetch('/weather?address=' + encodeURIComponent(search.value)).then((response) => {
        response.json().then((data) => {
            if (data.error){
                line1.innerHTML = "Error"
                return line2.innerHTML = data.error
            }

            line1.innerHTML = data.forecast
            line2.innerHTML = data.location
        })
    })
})