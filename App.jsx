
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx';
import { BookApp } from './pages/BookApp.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
// import { BookAdd } from './cmps/BookAdd.jsx';

import { UserMsg } from './cmps/UserMsg.jsx'
import { AppHeader } from './cmps/AppHeader.jsx';

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM



export function App() {
  return (
    <Router >
      <section className="app" >
        <AppHeader />
        <main>
          <Switch>
            {/* <Route component={BookAdd} path="/book/edit/:bookId?" /> */}
            <Route component={BookDetails} path="/book/:bookId" />
            <Route component={BookApp} path="/book" />
            <Route component={About} path="/about" />
            <Route component={Home} path="/" />
          </Switch>
          {/* <BookApp /> */}
        </main>
      </section>
      <UserMsg />
    </Router>
  );
}
