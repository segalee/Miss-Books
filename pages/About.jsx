// import React from "react"
const { NavLink, Route } = ReactRouterDOM


function Team() {
    return <ul>
        <li>Lee Segal</li>
        <li>Muki ben puki</li>
    </ul>
}

function Vision() {
    return <div>
        <span>Our vision:</span>
        <ul>
            <li>Offering books at best prices</li>
            <li>Best service and fastest delivery are guaranteed</li>
        </ul>
    </div>
}




export class About extends React.Component {
    render() {
        return (
            <section className="about">
                <div className="about-img"></div>
                <h1 className="about-txt">We're all about books...</h1>
                <NavLink activeClassName="my-active" to="/about/team">Our Team</NavLink>
                <NavLink activeClassName="my-active" to="/about/vision">Our Vision</NavLink>
                <Route component={Team} path="/about/team" />
                <Route component={Vision} path="/about/vision" />
            </section>
        )

    }

}
