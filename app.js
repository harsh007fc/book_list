///book constructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


///ui constructor
function UI() { }


UI.prototype.addBookToList = function (book)
 {
    //  console.log(book);
    const list = document.getElementById('book-list');

    ///create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
    // console.log(row);
}

//show error alerts
UI.prototype.showAlert = function (message, className) 
{
    //create div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    //add text node
    div.appendChild(document.createTextNode(message));

    //get a parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);

    //timeout after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

//delete book
UI.prototype.deletebook =function(target)
{
    if(target.className ==='delete')
    {
        target.parentElement.parentElement.remove();
    }
}

//clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

///event listners for add book
document.getElementById('book-form').addEventListener('submit',
    function (e) {
        ///get form values
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;



        //instantiate a book
        const book = new Book(title, author, isbn);
        //  console.log(book);


        //insatntiate ui object
        const ui = new UI();
        //  console.log(ui)

        ///validate form

        if (title === '' || author === '' || isbn === '') {
            //alert('failed');//stupid and old
            //show  error alert
            ui.showAlert('Please fill-in all fields', 'error');
        }
        else {
            ///add book to list
            ui.addBookToList(book);

            ///show success
            ui.showAlert('Book Added!!', 'success');

            //clear fields
            ui.clearFields();
        }



        e.preventDefault();
    }
);

///event listner for delete

document .getElementById('book-list').addEventListener('click',function(e)
{
   //insatntiate ui object
   const ui = new UI();

   ui.deletebook(e.target);

   //show an alert

   ui.showAlert('Book Removed','success');
    e.preventDefault();
})

