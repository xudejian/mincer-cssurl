# Mincer Css Url

[![Build Status](https://travis-ci.org/xudejian/mincer-cssurl.png)](https://travis-ci.org/xudejian/mincer-cssurl)

fix url in css for [Mincer](https://github.com/nodeca/mincer).

```css
background: url('select2.png') right top no-repeat;
```

will be render to

```css
background: url('/assets/select2/select2-1ea55de27688da0a7b20119a50b6dff3.png') right top no-repeat;
```

## Installation

Install from npm registry:

```
$ npm install mincer-cssurl
```

## Usage

```js
var Mincer = require('mincer');

require('mincer-cssurl')(Mincer);

// Enable configuration globally
Mincer.enable("cssurl");

// Enable configuration on specific environment
user_env.enable("cssurl");

// Disable previously enabled configuration
admin_env.disable("cssurl");

```
