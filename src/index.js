const allDishesContainerDiv = document.querySelector('div.all-dishes-container')
const addDishForm = document.querySelector('#add-dish-form')


// fetch('http://localhost:3000/dishes')
//     .then(response => response.json())
//     .then(console.log)
//     .then(function(dishesArray){
//         dishesArray.forEach(function(dishObject){
//             // renderOneDishCard(dishObject)

//             let dishImage = document.createElement('img')

//             dishImage.src = dishObject.image
//             dishImage.alt = dishObject.name

//             dishCard.append(dishImage)
//         })
//     })


fetch('http://localhost:3000/dishes')
    .then(response => response.json())
    .then(dishesArray => dishesArray.forEach(dishObject => {
        renderOneDishCard(dishObject)
    }))



function renderOneDishCard(dishObject){

    let dishCard = document.createElement('div')
    dishCard.classList.add('dish-card')
    dishCard.dataset.id = dishObject.id

    let dishNameH2 = document.createElement('h2')
    dishNameH2.classList.add('dish-name')
    dishNameH2.textContent = `Name: ${dishObject.name}`

    let dishDescriptionP = document.createElement('p')
    dishDescriptionP.classList.add('dish-description')
    dishDescriptionP.textContent = `Description: ${dishObject.description}`

    let dishCategoryH3 = document.createElement('h3')
    dishCategoryH3.classList.add('dish-category')
    dishCategoryH3.textContent = `Category: ${dishObject.category}`

    let dishImage = document.createElement('img')
    dishImage.classList.add('dish-image')
    dishImage.src = dishObject.image
    dishImage.alt = dishObject.name

    let editDishButton = document.createElement('button')
    editDishButton.classList.add('edit-dish-button')
    editDishButton.textContent = "edit"

    let deleteDishButton = document.createElement('button')
    deleteDishButton.classList.add('delete-dish-button')
    deleteDishButton.textContent = "remove"

    addDishForm.dataset.id = dishObject.id

    dishCard.append(dishNameH2, dishDescriptionP, dishCategoryH3, dishImage, editDishButton, deleteDishButton)

    allDishesContainerDiv.append(dishCard)



    dishCard.addEventListener('click', event => {
        if (event.target.className === 'delete-dish-button'){
            const dishCardDiv = event.target.closest('div')
            dishCardDiv.remove()
    
            fetch(`http://localhost:3000/dishes/${dishCard.dataset.id}`, {
            method: 'DELETE'
            })
            .then(e => e.json())
            .then(console.log)
        }
        else if (event.target.matches('.edit-dish-button')){
            console.log(event.target)

            // create form = editDishForm

            // append form to dishCard

            // set values in form

            // reset form

            const editDishForm = document.createElement('form')
            editDishForm.setAttribute('id', 'edit-dish-form')

            const editName = document.createElement('input')
            editName.classList.add('edit-name')
            editName.setAttribute('type', 'text')
            editName.setAttribute('name', 'editName')
            editName.setAttribute('placeholder', 'Name')
            editName.value = dishObject.name

            const editDescription = document.createElement('input')
            editDescription.classList.add('edit-description')
            editDescription.setAttribute('type', 'text')
            editDescription.setAttribute('name', 'editDescription')
            editDescription.setAttribute('placeholder', 'Description')
            editDescription.value = dishObject.description

            // const editCategory = document.createElement('select')
            // editCategory.setAttribute('id', 'edit-category-select')
            // editCategory.setAttribute('placeholder', 'Category')
            // editCategory.document.createElement('option')
            // editCategory.setAttribute('value', 'Breakfast')
            // editCategory.document.createElement('option')
            // editCategory.setAttribute('value', 'Lunch')
            // editCategory.document.createElement('option')
            // editCategory.setAttribute('value', 'Dinner')
            // editImage.value = dishObject.category

            const editImage = document.createElement('input')
            editImage.classList.add('edit-image')
            editImage.setAttribute('type', 'text')
            editImage.setAttribute('name', 'editImage')
            editImage.setAttribute('placeholder', 'Image link')
            editImage.value = dishObject.image

            editDishForm.append(editName, editDescription,  editImage)

            dishCard.append(editDishForm)



            // const updatedDishCardDiv = event.target.closest('div')
            // const updatedDishNameH2 = event.target.name.value
            // const updatedDishDescriptionP = event.target.description.value
            // const updatedDishCategoryH3 = event.target.category.value
            // const updatedDishImage = event.target.category.value

            fetch(`http://localhost:3000/dishes/${dishCard.dataset.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({})
            })
            .then(response => response.json())

        }
    })


}



addDishForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const newDishObj = {
        name: event.target.name.value,
        description: event.target.description.value,
        category: event.target.category.value,
        image: event.target.image.value
    }

    fetch(`http://localhost:3000/dishes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newDishObj)
    })
        .then(response => response.json())
        // .then(console.log)
        .then(newDishObject => {
            renderOneDishCard(newDishObject)

        addDishForm.reset()
        })
})




// fetch('http://localhost:3000/managers')
//     .then(response => response.json())
//     .then(console.log)


// fetch('http://localhost:3000/menus')
//     .then(response => response.json())
//     .then(console.log)
