# SseClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## 加入AngularMateial

```
ng add @angular/material
```

加入SharedAngularMaterial <https://ithelp.ithome.com.tw/articles/10209937

```
ng g m share\SharedAngularMaterial
```

在MatIcon中使用SVG

必須透過Angular提供的DomSanitizer Service來信任這個路徑。接著我們就可以透過MatIconRegistry來擴充SVG icon

```typescript
export class SharedAngularMaterialModule implements OnInit {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.ngOnInit();
  }
  ngOnInit(): void {
    // this.matIconRegistry.addSvgIconInNamespace(
    //   "custom-svg",
    //   "angular",
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/angular_solidBlack.svg")
    // );
  }
```

## 在MatIcon中使用Icon Font
```bash
npm install --save @fortawesome/fontawesome-free
```
接下來在src\styles.scss中
```scss
@import "~@fortawesome/fontawesome-free/css/all.css";
```

## 加入Dashboard模組

```
ng g module pages/Dashboard --routing --module app
```

加入

```
ng g component pages/Dashboard/Dashboard --flat
```