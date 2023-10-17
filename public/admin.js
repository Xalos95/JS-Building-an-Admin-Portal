
async function main()
{
    //fetching books from host
    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(renderBookChange)
}

function renderBookChange(book)
{
    //was missing root which gets the first element of the document until there's no more
    let root = document.querySelector('#root')

    //created a list item for the books
    let bookLi = document.createElement('li')
    bookLi.textContent = book.title
    
    //textbox to ask for inout from user about book quantity
    let bookQuant = document.createElement('input')
    bookQuant.value = book.quantity
    
    //creating  a save button for the inputs
    let saveBttn = document.createElement('button')
    saveBttn.textContent = 'Save'
    
    //event listener to the save button and where to update in API
    saveBttn.addEventListener('click',() => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: book.id,
                quantity: bookQuant.value
            })
        })
    })
     //appending the book to the list items and was missing book quantity
    bookLi.append(bookQuant, saveBttn)
    root.append(bookLi)
}

main()