"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeSwitcher = void 0;
class ThemeSwitcher {
    constructor(el, params) {
        this.elementsClass = 'ThemeSwitcher__item';
        this.elementActiveClass = `${this.elementsClass}--active`;
        this.el = el;
        this.elements = [...el.querySelectorAll(`.${this.elementsClass}`)];
        this.linkEl = document.head.querySelector(`#${params.linkId}`);
        this.lightSchemeRoute = params.routes.light;
        this.darkSchemeRoute = params.routes.dark;
        this.schemeKey = params.schemeKey;
        this.defaultScheme = params.defaultScheme;
        this.name = el.dataset.name || '';
        this.init();
    }
    init() {
        try {
            this.check();
            this.listen();
            let currentScheme = this.getScheme();
            this.setScheme(currentScheme);
            this.el.onclick = this.clickHandler.bind(this);
        }
        catch (err) {
            console.warn(err.message);
        }
    }
    clickHandler() {
        let allSchemes = ['light', 'dark', 'system'];
        let currentScheme = this.getScheme();
        let currentSchemeIndex = allSchemes.findIndex((item) => item == currentScheme);
        if ((allSchemes.length - 1) == currentSchemeIndex)
            currentSchemeIndex = 0;
        else
            currentSchemeIndex++;
        let nextScheme = allSchemes[currentSchemeIndex];
        this.setScheme(nextScheme);
    }
    listen() {
        window.addEventListener('storage', () => {
            let currentScheme = this.getScheme();
            for (let item of this.elements) {
                item.classList.remove(this.elementActiveClass);
            }
            (this.elements.find((el) => el.dataset.value == currentScheme)).classList.add(this.elementActiveClass);
            switch (currentScheme) {
                case 'light':
                    this.setLink(this.lightSchemeRoute);
                    break;
                case 'dark':
                    this.setLink(this.darkSchemeRoute);
                    break;
                case 'system':
                    this.systemSchemeListener();
                    break;
            }
        });
    }
    systemSchemeListener() {
        let matchMedia = window.matchMedia('(prefers-color-scheme: light)');
        matchMedia.matches ? this.setLink(this.lightSchemeRoute) : this.setLink(this.darkSchemeRoute);
        matchMedia.addListener((e) => {
            e.matches ? this.setLink(this.lightSchemeRoute) : this.setLink(this.darkSchemeRoute);
        });
    }
    setLink(route) {
        this.linkEl.setAttribute('href', route);
    }
    getScheme() {
        let allSchemes = ['light', 'dark', 'system'];
        let scheme = localStorage.getItem(this.schemeKey) || this.defaultScheme;
        if (!allSchemes.includes(scheme) || !scheme.length) {
            scheme = this.defaultScheme;
        }
        return scheme;
    }
    setScheme(val) {
        localStorage.setItem(this.schemeKey, val);
        window.dispatchEvent(new Event('storage'));
    }
    check() {
        if (!this.el)
            throw new Error(`Component "${this.name}" not found!`);
        if (!this.linkEl)
            throw new Error('Link element for change theme is not found!');
        console.info(`Component "${this.name}" is ready.`);
    }
}
exports.ThemeSwitcher = ThemeSwitcher;
exports.default = ThemeSwitcher;
