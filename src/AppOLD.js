import Handlebars from 'handlebars';
import LoginPage from './pages/login';
import Input from './components/Input.js';
import Button from './components/Button.js';
import Link from './components/Link.js';
import Navigation from './components/Navigation.js';
import PAGE_NAMES from "./pageNames.js";

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Navigation', Navigation);

export default class App {
    constructor() {
        this.state = {
            currentPage: PAGE_NAMES.login.name,
        };
        this.appElement = document.getElementById('app');
    }

    render() {
        let template = Handlebars.compile(LoginPage);
        this.appElement.innerHTML = template({});
    }
}
