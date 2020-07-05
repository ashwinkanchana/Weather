const weatherForm = document.querySelector('form')

const search = document.querySelector('input')
const paragrphOne = document.querySelector('#status')
const paragrphTwo = document.querySelector('#report')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()    
    const location = search.value
    const url = 'http://192.168.1.183:3000/weather?search=' + location
    paragrphOne.textContent = 'Loading...'
    paragrphTwo.textContent = ''
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                paragrphOne.textContent = data.error
            } else{
                paragrphOne.textContent = data.location;
                paragrphTwo.textContent = data.forecast;
            }
        })
    })
     
})


