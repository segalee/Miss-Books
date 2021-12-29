import { bookService } from "../services/book.service.js"
import { eventBusService } from "../services/event-bus.service.js"

export class BookAdd extends React.Component {
    state = {
        searchBy: {
            title: '',
        },
        searchedBooks: []
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ searchBy: { ...prevState.searchBy, [field]: value } }), () => {
            this.props.onSetSearch(this.state.searchBy)
        })
    }
    onSubmitSearch = (ev) => {
        ev.preventDefault()
        console.log('ev', ev)
        const { title } = this.state.searchBy;
        const { searchedBooks } = this.state;
        console.log('title:', title);
        bookService.getSearchedBooks(title).then(searchedBooks => {
            if (!searchedBooks) return
            this.setState({ searchedBooks })
        });
        this.props.onSetSearch(this.state.searchBy)
        this.cleanForm()
    }

    onAddBook = (book) => {
        bookService.addBook(book).then(() => {
            eventBusService.emit('user-msg', { txt: 'Book added', type: 'success' })
            this.setState({ txt: '', optBooks: [] })
            this.props.loadBooks()
        })
    }

    cleanForm = () => {
        this.setState({ searchBy: { title: '' } })
    }

    render() {
        const { searchedBooks } = this.state;
        const { title } = this.state.searchBy
        return <React.Fragment>
            <form onSubmit={this.onSubmitSearch}>
                <label
                    htmlFor="by-title">Search By Title:</label>
                <input ref={this.inputRef} placeholder="Enter title" type="text" value={title} name="title" onChange={this.handleChange}></input>
                <button>Search</button>

            </form>
            {searchedBooks.length > 0 && <ul>
                {searchedBooks.map((book, idx) => (
                    <li className="opt-book" key={idx}>{book.volumeInfo.title}
                        <button onClick={() => this.onAddBook(book)}> + </button></li>
                ))}
            </ul>}
        </React.Fragment>
    }

}