export type Scheme = 'light' | 'dark' | 'system';

interface IParams {
  linkId: string,
  schemeKey: string,
  defaultScheme: Scheme,
  routes: {
    light: string,
    dark: string
  }
}

export class ThemeSwitcher {
  public readonly elementsClass: string = 'ThemeSwitcher__item';
  public readonly elementActiveClass: string = `${this.elementsClass}--active`;
  public readonly name: string;
  public readonly schemeKey: string;
  public readonly defaultScheme: Scheme;
  public linkEl: HTMLLinkElement | null;

  protected el: HTMLDivElement | null;
  protected elements: HTMLDivElement[];
  protected lightSchemeRoute: string;
  protected darkSchemeRoute: string;

  constructor(el: HTMLDivElement | null, params: IParams) {
    this.el = el;
    this.elements = [...el!.querySelectorAll<HTMLDivElement>(`.${this.elementsClass}`)];
    this.linkEl = document.head.querySelector(`#${params.linkId}`);
    this.lightSchemeRoute = params.routes.light;
    this.darkSchemeRoute = params.routes.dark;
    this.schemeKey = params.schemeKey;
    this.defaultScheme = params.defaultScheme;
    this.name = el!.dataset.name || '';

    this.init();
  }

  protected init(): void {
    try {
      this.check();
      
      this.listen();
      let currentScheme = this.getScheme();
      this.setScheme(currentScheme);

      this.el!.onclick = this.clickHandler.bind(this);
    } catch (err: Error | any) {
      console.warn(err.message);
    }
  }

  protected clickHandler(): void {
    let allSchemes: Scheme[] = ['light', 'dark', 'system'];
    let currentScheme: Scheme = this.getScheme();

    let currentSchemeIndex: number = allSchemes.findIndex((item: Scheme): boolean => item == currentScheme);
    if ((allSchemes.length - 1) == currentSchemeIndex)
      currentSchemeIndex = 0;
    else 
      currentSchemeIndex++;

    let nextScheme: Scheme = allSchemes[currentSchemeIndex];
    this.setScheme(nextScheme);
  }

  protected listen(): void {
    window.addEventListener('storage', () => {
      let currentScheme: Scheme = this.getScheme();

      for (let item of this.elements) {
        item.classList.remove(this.elementActiveClass);
      }

      (this.elements.find((el: HTMLDivElement): boolean => el.dataset.value == currentScheme))!.classList.add(this.elementActiveClass);

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

  protected systemSchemeListener(): void {
    let matchMedia = window.matchMedia('(prefers-color-scheme: light)');
    matchMedia.matches ? this.setLink(this.lightSchemeRoute) : this.setLink(this.darkSchemeRoute);

    matchMedia.addListener((e: MediaQueryListEvent): void => {
      e.matches ? this.setLink(this.lightSchemeRoute) : this.setLink(this.darkSchemeRoute);
    });
  }

  protected setLink(route: string): void {
    this.linkEl!.setAttribute('href', route);
  }

  protected getScheme(): Scheme {
    let allSchemes: Scheme[] = ['light', 'dark', 'system'];
    let scheme: string | Scheme = localStorage.getItem(this.schemeKey) || this.defaultScheme;

    if (!allSchemes.includes(scheme as Scheme) || !scheme.length) {
      scheme = this.defaultScheme;
    }

    return scheme as Scheme;
  }

  public setScheme(val: Scheme): void {
    localStorage.setItem(this.schemeKey, val);

    window.dispatchEvent(new Event('storage'));
  }

  protected check(): void {
    if (!this.el)
      throw new Error(`Component "${this.name}" not found!`);

    if (!this.linkEl)
      throw new Error('Link element for change theme is not found!');
      
    console.info(`Component "${this.name}" is ready.`);
  }
}

export default ThemeSwitcher;