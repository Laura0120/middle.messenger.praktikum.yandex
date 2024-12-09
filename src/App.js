import Handlebars from 'handlebars';
import LoginPage from './pages/login';

import Input from './components/Input.js';
import Button from './components/Button.js';
import Link from './components/Link.js';

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);

export default class App {
    constructor() {
        this.appElement = document.getElementById('app');
    }

    render() {
        let template = Handlebars.compile(LoginPage);
        this.appElement.innerHTML = template({});
    }
}
