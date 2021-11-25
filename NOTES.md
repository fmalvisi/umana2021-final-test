
## step 1: init new angular 12
- yarn add @angular/cli@12
- ng new frontend --skip-git true --routing true --style scss --view-encapsulation ShadowDom
- cd frontend

## step 2: add linter eslint using schematics
- ng add @angular-eslint/schematics

## step 3: add prettier, eslint plugins and some rules
- yarn add prettier eslint-plugin-prettier eslint-plugin-rxjs --dev

- add .prettierignore
- add .prettierrc.json config file
- add .eslintignore ignore file
- edit .eslintrc.json:

    - add plugins and extends on .eslintrc.json

      "plugins": ["prettier"],
      "extends": [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:rxjs/recommended"
        ],

    - add rules on .eslintrc.json
        "rxjs/no-implicit-any-catch": "off",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-inferrable-types": [
          "error",
          {
            "ignoreParameters": true,
            "ignoreProperties": false
          }
        ],
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "prettier/prettier": "error"

## step 4: add stylelint
- yarn add stylelint stylelint-scss stylelint-config-prettier --dev
- yarn add stylelint-config-standard stylelint-config-sass-guidelines stylelint-order --dev
- add .stylelintrc.json file
- edit package.json scripts:

## step 5: enable husky + lint-staged
- yarn add lint-staged husky --dev
- add .lintstagedrc.json file
- yarn husky install
- npx husky add .husky/pre-commit "yarn lint-staged"

## step 6: enable commitlint husky hook
- yarn add @commitlint/cli @commitlint/config-conventional @commitlint/prompt --dev
- npx husky add .husky/commit-msg 'yarn commitlint --edit "$1"'
- add commitlint.config.js file

## step 7: keycloak auth guard
- dockerfile with nginx conf
- docker-compose.yaml
- yarn add keycloak-angular keycloak-js
- add auth-guard and keycloak-init.factory
- add guard to route canActivate: [AuthGuard]
- add APP_INITIALIZER to app.module
