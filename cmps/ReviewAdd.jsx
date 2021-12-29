// import { storageService } from "../services/storage.service.js";
import { bookService } from '../services/book.service.js'
import { StarRating } from '../cmps/StarRating.jsx';
import { eventBusService } from '../services/event-bus.service.js';

export class ReviewAdd extends React.Component {
    state = {
        review: {
            fullName: "",
            date: this.defaultDate,
            bookReview: "",
            rating: 0,
        },

    };
    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }

    get defaultDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const currDate = `${year}-${month}-${day}`;
        return currDate;
    }
    onSubmit = (ev) => {
        ev.preventDefault();
        const { review } = this.state;
        const { bookId } = this.props;
        bookService.saveReview(bookId, review).then(() => {
            eventBusService.emit('user-msg', { txt: 'Review was added!', type: 'success' })
            this.props.loadBook()
        });
        this.props.onToggleReviewModal();

    };
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === "number" ? +target.value : target.value;
        this.setState((prevState) => ({
            review: { ...prevState.review, [field]: value },
        }));
    };

    render() {
        const { savedReviews } = this.state;
        console.log('savedReviews:', savedReviews);
        return (
            <section>
                <form className="review-form" onSubmit={this.onSubmit}>
                    <input
                        ref={this.inputRef}
                        type="text"
                        placeholder="Enter your full name"
                        name="fullName"
                        onChange={this.handleChange}
                    ></input>
                    <StarRating handleChange={this.handleChange} rating={this.state.rating} />
                    {/* <select
                        name="rate"
                        id="rate"
                        name="rate"
                        // value={rate}
                        onChange={this.handleChange}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select> */}
                    <input
                        type="date"
                        id="start"
                        name="date"
                        defaultValue={this.defaultDate}
                        onChange={this.handleChange}
                    ></input>
                    <textarea
                        placeholder="free text"
                        name="bookReview"
                        rows="4"
                        cols="50"
                        onChange={this.handleChange}
                    ></textarea>
                    <button>Submit</button>
                </form>


            </section>
        );
    }
}