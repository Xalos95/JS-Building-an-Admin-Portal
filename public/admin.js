
async function main()
{
    //fetching books from host
    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(renderBookForm)
}

function renderBookForm(book)
{
    let bookForm = document.querySelector('.container')

    //created a list item for the books
    let bookLi = document.createElement('li')
    bookLi.textContent = book.title

    //textbox to ask for inout from user about book quantity
    let bookQuant = document.createElement('input')
    bookQuant.value = book.quantity

    //appending the book to the list items
    bookLi.append(bookQuant)

    //creating  a save button for the inputs
    let saveBttn = document.createElement('button')
    saveBttn.textContent = 'Save'

    //event listener to the save button
    saveBttn.addEventListener('click',() => {
        let response = fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {'Content-Type': 'application:json'},
            body: JSON.stringify({
                id: book.id,
                quantity: bookQuant.value
            })
        })
        console.log(response)
    })
    bookLi.append(saveBttn)
    bookForm.append(bookLi)
}

main()