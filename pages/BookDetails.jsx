import { eventBusService } from "../services/event-bus.service.js";
import { utilService } from '../services/util.service.js'
import { bookService } from '../services/book.service.js';
import { LongTxt } from '../cmps/LongTxt.jsx'
import { ReviewAdd } from '../cmps/ReviewAdd.jsx';
import { ReviewList } from '../cmps/ReviewList.jsx';


export class BookDetails extends React.Component {
    state = {
        isLongTxtShown: false,
        book: null,
        isShowReviewModal: false,
    }
    componentDidMount() {
        this.loadBook()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook();
        }
    }

    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getBookById(bookId).then(book => {
            if (!book) return this.props.history.push('/')
            this.setState({ book })

        })
    }
    get bookLengthMsg() {
        const { pageCount } = this.state.book
        let msg;
        if (pageCount < 100) {
            msg = 'Light Reading'
        } else if (pageCount > 200 && pageCount < 500) {
            msg = 'Decent Reading'
        } else msg = 'Long Reading'
        return msg
    }
    get bookAgeMsg() {
        const { publishedDate } = this.state.book
        let msg;
        if (publishedDate < 1) {
            msg = 'New!'
        } else if (publishedDate > 10) {
            msg = 'Veteran Book'
        } else msg = null
        return msg
    }
    get classNameByPrice() {
        const { listPrice } = this.state.book
        const price = listPrice.amount;
        let classNameByPrice;
        if (price > 150) {
            classNameByPrice = 'red'
        } else if (price < 20) {
            classNameByPrice = 'green';
        }
        return classNameByPrice
    }

    showStars = (countStar) => {
        return (
            [...Array(5)].map((star, idx) => (
                <span key={idx} className={"star " + (idx < countStar ? "on" : "off")}>&#9733;</span>
            ))
        )
    }
    onRemoveBook = () => {
        const { id } = this.state.book;
        bookService.removeBook(id).then(() => {
            eventBusService.emit('user-msg', { txt: 'Book was deleted!', type: 'danger' })
            this.onGoBack()
        });
    };
    onToggleReviewModal = () => {
        this.setState((prevState) => ({ ...prevState, isShowReviewModal: !this.state.isShowReviewModal }));
    };
    onRemoveReview = (reviewId) => {
        const bookId = this.state.book.id;
        bookService.removeReview(bookId, reviewId).then(() => {
            eventBusService.emit('user-msg', { txt: 'Review was deleted!', type: 'danger' })
            this.loadBook()
        });
    };
    onGoBack = () => {
        this.props.history.push('/book')
    }
    toggleLongTxt = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }

    showStars = (countStar) => {
        return (
            [...Array(5)].map((star, idx) => (
                <span key={idx} className={"star " + (idx < countStar ? "on" : "off")}>&#9733;</span>
            ))
        )
    }
    render() {
        if (!this.state.book) return <div>Loading...</div>
        const { Link } = ReactRouterDOM
        const { title, language, thumbnail, listPrice, id, description, reviews } = this.state.book
        const currency = listPrice.currencyCode
        const { isLongTxtShown, isShowReviewModal } = this.state;
        const nextId = bookService.getRequestedBookId(id, 1)
        const prevId = bookService.getRequestedBookId(id, -1)
        console.log('nextId, prevId:', nextId, prevId);

        let saleMsg = listPrice.isOnSale ? 'SALE!' : ''
        return (
            <React.Fragment>
                <section className="book-details">

                    <img src={thumbnail} alt="" />

                    <section className='book-details-info'>
                        <h3 className='book-title'>{title}</h3>
                        <p>length: {this.bookLengthMsg}</p>
                        <p>{this.bookAgeMsg}</p>
                        <p className={this.classNameByPrice}>Price: {listPrice.amount}{utilService.getCurrency(currency)} {saleMsg}</p>
                        <p>language: {language}</p>
                        <LongTxt toggleLongTxt={this.toggleLongTxt} text={description} isLongTxtShown={isLongTxtShown} />
                        <div className='btns-div'>
                            <button onClick={this.onToggleReviewModal}>Add review</button>
                            {isShowReviewModal && (
                                <ReviewAdd bookId={id} loadBook={this.loadBook} onToggleReviewModal={this.onToggleReviewModal} />
                            )}
                            <button onClick={this.onGoBack}>Go back</button>
                            <button onClick={this.onRemoveBook}>Remove book</button>
                            <div>
                                <Link to={`/book/${prevId}`}>Previous</Link>
                                <Link to={`/book/${nextId}`}>Next</Link>
                            </div>
                        </div>
                    </section>
                </section>
                <section className='reviews'>
                    <ReviewList reviews={reviews} showStars={this.showStars} onRemoveReview={this.onRemoveReview}></ReviewList>
                </section>
            </React.Fragment>

        )
    }
}