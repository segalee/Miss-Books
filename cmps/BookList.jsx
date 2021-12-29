import { BookPreview } from "./BookPreview.jsx"
export function BookList({ books, onSelectBook }) {

    return (
        <section className="books-list">
            {books.map(book => {
                {/* return <h1>{book.title}</h1> */ }
                { return <BookPreview key={book.id} book={book} onSelectBook={onSelectBook} /> }
            })
            }
        </section>
    )
}