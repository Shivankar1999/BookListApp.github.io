// Book Class : Represents a Book
class Book {
    constructor(title, author, isbn) {
        Object.assign(this, { title, author, isbn });
    }
}
// UI lass : Handle UI Task

class UI {
    static DisplayBooks() {
       
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#Booklist');

        const row = document.createElement('tr');

        row.innerHTML = `
           <td>${book.title}</td>
           <td>${book.author}</td>
           <td>${book.isbn}</td>
           <td><a href = "#" class = 'btn-danger delete'>X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
      static showAlert(message,className){
          const div = document.createElement('div');
          div.className = `alert alert-${className}`;
          div.appendChild(document.createTextNode(message));
          const container = document.querySelector('.container');
          const form  = document.querySelector('#form');
          container.insertBefore(div,form);
        //   Vanish in 2s
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
      }

    static ClearFeilds() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
 
    }

}

// Store Class : Handle Storage 
class Store {
    static getBooks(){
     let books;
          if(localStorage.getItem('books') === null){
              books = [];
          }else{
              books =  JSON.parse(localStorage.getItem('books'));
          }
          return books ;

    }

    static addBooks(book){
    const books  = Store.getBooks();
     
       books.push(book);
       localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBook(isbn){
       const books = Store.getBooks();
       books.forEach((book,index) =>{
           if(book.isbn === isbn){
               books.splice(index,1);
           }
       });
       localStorage.setItem('books',JSON.stringify(books));
    }
}

// Event: Events : Display Books
document.addEventListener('DOMContentLoaded', UI.DisplayBooks);

// Evet: Add a Book
document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Get All Input Values By The User
    const Title = document.querySelector('#title').value;
    const Author = document.querySelector('#author').value;
    const ISBN = document.querySelector('#isbn').value;

    // Validate the form

    if(Title === ''|| Author === '' || ISBN === ''){
      UI.showAlert('Please Fill all the feilds','danger');
    }else{

        // Instatiate book
          const book = new Book(Title, Author, ISBN);

    // Display Books TO UI
    UI.addBookToList(book);

    // Add book to Store
     Store.addBooks(book);

    console.log(book);
    // Show Success
    UI.showAlert('Book Added' ,'success');

    //   Clear Felids
    UI.ClearFeilds(); 
    }
})

// Event : Remove a Book

document.querySelector('#Booklist').addEventListener('click' , (e) =>{
    UI.deleteBook(e.target);

     // Remove a Book
     UI.showAlert('Book Removed' ,'success');
    //  Remove Book From Store

      Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})
