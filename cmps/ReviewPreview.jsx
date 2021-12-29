export function ReviewPreview({ review, showStars, onRemoveReview }) {
    return <div key={review.id} className="review-details">
        <button className="btn-remove-review" onClick={() => onRemoveReview(review.id)}>×</button>
        <h4>{review.fullName}</h4>
        <h5>{review.date}</h5>
        <h4>{showStars(review.rating)}</h4>
        <p>{review.bookReview}</p>
    </div>
}