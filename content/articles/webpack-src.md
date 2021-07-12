---
title: 手写webpack源码
description: 使用babel实现webpack的一部分功能
cover: http://pics.goder.club/cover/51006223610_bd235c123b_o.jpg
---

webpack.js

```javascript
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

function getModuleInfo(file) {
  const body = fs.readFileSync(file, 'utf-8')

  // 转换AST
  const ast = parser.parse(body, {
    sourceType: 'module'
  })

  // import 收集依赖
  const deps = {}
  traverse(ast, {
    //visitor
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file)
      const abspath = './' + path.join(dirname, node.source.value)
      deps[node.source.value] = abspath
    }
  })

  // es6 -> es5

  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })

  const moduleInfo = {
    file,
    deps,
    code
  }

  return moduleInfo
}

const info = getModuleInfo('./src/index.js')
console.log(info)
```

> {
>   file: './src/index.js',
>   deps: { './add.js': './src/add.js' },
>   code: '"use strict";\n' +
>     '\n' +
>     'var _add = _interopRequireDefault(require("./add.js"));\n' +
>     '\n' +
>     'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
>     '\n' +
>     'console.log((0, _add["default"])(1, 5));'
> }

模块解析

```javascript
// 模块解析
function parseModules(file) {
  const entry = getModuleInfo(file)
  const tmp = [ entry ]
  const depsGraph = {}

  getDeps(tmp, entry)

  tmp.forEach(info => {
    depsGraph[info.file] = {
      deps: info.deps,
      code: info.code
    }
  })

  return depsGraph
}

function getDeps(tmp, { deps }) {
  Object.keys(deps).forEach(key => {
    const child = getModuleInfo(deps[key])
    tmp.push(child)
    getDeps(tmp, child)
  })
}

const content = parseModules('./src/index.js')
console.log(content)
```

```javascript
{
  './src/index.js': {
    deps: { './add.js': './src/add.js' },
    code: '"use strict";\n' +
      '\n' +
      'var _add = _interopRequireDefault(require("./add.js"));\n' +
      '\n' +
      'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
      '\n' +
      'console.log((0, _add["default"])(1, 5));'
  },
  './src/add.js': {
    deps: {},
    code: '"use strict";\n' +
      '\n' +
      'Object.defineProperty(exports, "__esModule", {\n' +
      '  value: true\n' +
      '});\n' +
      'exports["default"] = void 0;\n' +
      '\n' +
      'var _default = function _default(a, b) {\n' +
      '  return a + b;\n' +
      '};\n' +
      '\n' +
      'exports["default"] = _default;'
  }
}
```



bundle

```javascript
function bundle(file) {
  const depsGraph = JSON.stringify(parseModules(file))

  return `(function (graph) {
        function require(file) {
          function absRequire(relPath) {
            return require(graph[file].deps[relPath])
          }
          var exports = {};
          (function (require, exports, code) {
            eval(code)
          })(absRequire, exports, graph[file].code)
          return exports
        }
        require('${file}')
    })(${depsGraph})`
}

const content = bundle('./src/index.js')
!fs.existsSync('./dist') && fs.mkdirSync('./dist')
fs.writeFileSync('./dist/bundle.js', content)
```

node webpack.js -> bundle.js

```javascript
(function (graph) {
        function require(file) {
          function absRequire(relPath) {
            return require(graph[file].deps[relPath])
          }
          var exports = {};
          (function (require, exports, code) {
            eval(code)
          })(absRequire, exports, graph[file].code)
          return exports
        }
        require('./src/index.js')
    })({"./src/index.js":{"deps":{"./add.js":"./src/add.js"},"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log((0, _add[\"default\"])(1, 5));"},"./src/add.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _default = function _default(a, b) {\n  return a + b;\n};\n\nexports[\"default\"] = _default;"}})
```

