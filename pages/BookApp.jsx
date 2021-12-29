import { eventBusService } from '../services/event-bus.service.js'

import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookAdd } from '../cmps/BookAdd.jsx'
// import { BookDetails } from './BookDetails.jsx'
// const { Link } = ReactRouterDOM

export class BookApp extends React.Component {

    state = {
        books: [],
        filterBy: null,
        searchBy: null,
        selectedBook: null
    }

    componentDidMount() {
        this.loadBooks()
    }


    loadBooks = () => {
        const { filterBy } = this.state
        bookService.query(filterBy).then(books => {
            this.setState({ books })
            // console.log('books:', books);
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }
    onSetSearch = (SearchBy) => {
        console.log('working', SearchBy)
        // this.setState({ SearchBy }, this.loadBooks)
    }

    onSelectBook = (selectedBook) => {
        // console.log('selectedBook:', selectedBook);
        this.setState({ selectedBook })
    }
    onRemoveBook = (bookId) => {
        // console.log('bookId:', bookId);
        bookService.removeBook(bookId).then(() => {
            const newBooks = this.state.books.filter(book => book.id !== bookId)
            this.setState({ books: newBooks }, this.onBack)
        })
    }

    onBack = () => {
        this.setState({ selectedBook: null })
    }

    render() {
        const { books, selectedBook } = this.state;
        // console.log('books:', books);
        return (
            <section className="book-app">
                {!selectedBook &&
                    <React.Fragment>

                        {/* <Link className="primary-btn clean-link" to="/book/edit">Add book + </Link> */}
                        <BookAdd onSetSearch={this.onSetSearch} />
                        <BookFilter onSetFilter={this.onSetFilter} />
                        <BookList books={books} onSelectBook={this.onSelectBook} />
                    </React.Fragment>}
                {/* {selectedBook && <BookDetails book={selectedBook} onBack={this.onBack} onRemoveBook={this.onRemoveBook} />} */}
            </section>
        )
    }
}
