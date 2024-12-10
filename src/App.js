import Handlebars from 'handlebars';
import * as Pages from './pages';
import PAGE_NAMES from './pageNames';

import Input from './components/Input.js';
import Button from './components/Button.js';
import Link from './components/Link.js';
import Navigation from "./components/Navigation.js";

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
        let template = Handlebars.compile(Pages[this.state.currentPage]);
        this.appElement.innerHTML = template({});
        this.attachEventListeners();
    }

    attachEventListeners() {
        const navLinks = document.querySelectorAll('.nav_link');
        console.log(navLinks)
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {

                e.preventDefault();
                this.changePage(e.target.dataset.page);

            });
        });
    }

    changePage(page) {
        this.state.currentPage = page;
        this.render();
    }
}
