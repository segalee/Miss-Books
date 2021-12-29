export class LongTxt extends React.Component {

    render() {
        const { text, isLongTxtShown, toggleLongTxt } = this.props;
        console.log('text:', text);
        console.log('isLongTxtShown:', isLongTxtShown);

        return (
            <section className="description">
                {!isLongTxtShown && <div> <p>{text.substring(0, 100)}...</p><button onClick={toggleLongTxt} className="continue-reading-btn" >Continue reading...</button></div>}
                {isLongTxtShown && <p>{text}</p>}

            </section>

        )
    }
}