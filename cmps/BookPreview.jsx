import { utilService } from "../services/util.service.js";
const { Link } = ReactRouterDOM
export function BookPreview({ book, onSelectBook }) {
    // console.log('book:', book);
    const currency = book.listPrice.currencyCode

    return <Link to={`/book/${book.id}`}>
        <article onClick={() => onSelectBook(book)} className="book-preview">
            <img src={book.thumbnail} alt=""></img>
            <h4>Title: {book.title}</h4>
            <h4>Price: {book.listPrice.amount} {utilService.getCurrency(currency)}</h4>
            {book.authors.map((author, idx) => <p key={idx}>By {author}</p>)}
        </article>
    </Link>
}