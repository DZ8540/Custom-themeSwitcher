# DZ Custom-themeswitcher
In order to use, it is enough to find the element you need, and then pass it to the class.

## Installation
1. Via npm
```cmd
npm i @dz8540/custom-themeswitcher
```
2. Manually - all you need is in the "Dist" folder.
```html
<script src="/Your-path/CustomThemeSwitcher.min.js"></script>
```

## Example
### HTML
```html
<!-- In head tag -->
<link rel="stylesheet" id="yourId">
<!-- In head tag -->

<div class="ThemeSwitcher" data-name="Your theme switcher component name">
  <div class="ThemeSwitcher__item" data-value="light">
    <i class="Icon Icon__sun ThemeSwitcher__icon"></i>
  </div>

  <div class="ThemeSwitcher__item" data-value="dark">
    <i class="Icon Icon__moon ThemeSwitcher__icon"></i>
  </div>

  <div class="ThemeSwitcher__system ThemeSwitcher__item" data-value="system">
    <i class="Icon Icon__sun ThemeSwitcher__icon"></i>
    <i class="Icon Icon__moon ThemeSwitcher__icon"></i>
  </div>
</div>
```
### JS
```js
let el = document.querySelector('.ThemeSwitcher');
new ThemeSwitcher(el, {
  schemeKey: 'scheme',
  defaultScheme: 'system',
  linkId: 'yourId',
  routes: {
    light: './CSS/light.css',
    dark: './CSS/dark.css'
  }
});
```

## Instruction:
1. Component maintains data-name attribute, to you can set component name.
2. Attention!!! There must be a link tag so that the component can change path for css files.
3. For every element with "ThemeSwitcher__item" class in the main component, you have to add schemes values (data-value).
4. Support for system theme change.

## Params:
1. schemeKey - key in browser local storage.
2. defaultScheme - default scheme if local storage is empty.
3. linkId - id for link element for change path css files when theme is changed.
4. routes - routes for css files.

## End
That's all! Enjoy this (〜￣▽￣)〜