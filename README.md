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

## License

The MIT License (MIT)

Copyright © 2014 Dejian Xu <xudejian2008@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
