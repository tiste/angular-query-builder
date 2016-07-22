# angular-query-builder

Query builder as JSON from angular directive

## Install

`$ npm install -SE angular-query-builder`

Add it as an angular dependency:

```js
angular.module('app', [
    'ngQueryBuilder',
]);
```

## Usage

Simply define an options object:

```js
$scope.options = {
    fields: [
        { name: 'Firstname', value: 'firstname' },
        { name: 'Lastname', value: 'lastname' },
        { name: 'Birthdate', value: 'birthdate' },
        { name: 'City', value: 'city' },
        { name: 'Country', value: 'country' },
    ],

    // optional operators
    operators: [
        { name: 'AND', value: '$and' },
        { name: 'OR', value: '$or' },
    ],

    // ... and conditions
    conditions: [
        { name: 'equal', value: '$eq' },
        { name: 'is not equal', value: '$neq' },
        { name: 'less than', value: '$lt' },
        { name: 'less than or equal', value: '$lte' },
        { name: 'greater than', value: '$gt' },
        { name: 'greater than or equal', value: '$gte' },
    ],
};
```

Then add the directive to your view:

```html
<div query-builder="options"></div>
```

You can now get the result as `{{options.query}}`

### Templating

You can use your own template by setting a `templateUrl` in the directive:

```html
<div query-builder="options" template-url="templateUrl"></div>
```

or

```js
$scope.options = {
    templateUrl: '/src/query-builder-group-directive.html',
};
```

> The template needs to be recursive. You can have a look [at the project one](https://github.com/tiste/angular-query-builder/blob/master/src/query-builder-group-directive.html).

## Build

Just run `npm run dev` to start webserver, and build everything with `npm run build`

## Want to help?

1. [Fork it](https://github.com/tiste/angular-query-builder/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes using [commitizen](https://github.com/commitizen/cz-cli) (`git commit -am 'feat: add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

[MIT](https://github.com/tiste/angular-query-builder/blob/master/LICENCE)
