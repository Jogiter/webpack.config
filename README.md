# webpack.config

## usage

```sh
# 创建 package.json
yarn init -y
# 安装依赖
yarn add thunder-cli
# 添加 .eslintrc.js 配置
touch .eslintrc.js
# 添加 .thunderrc.js 配置
touch .thunderrc.js
# 编译
thunder --watch
thunder --build
```

## .editorConfig

```.editorConfig
# EditorConfig is awesome: http://EditorConfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 4
insert_final_newline = true
trim_trailing_whitespace = true
```


## .eslintrc.js

使用较宽松的语法，可以在 thunder 配置文件同级目录进行覆盖

```js
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    sourceType: "module"
  },
  parser: "babel-eslint",
  rules: {
    indent: ["warn", 4],
    quotes: ["error", "single"],
    semi: ["error", "always"]
  },
  globals: {
    $: true,
    xla: true,
    xlQuickLogin: true,
    getCookie: true,
    setCookie: true,
    haslogin: true,
    login: true,
    logout: true,
    msgExit: true,
  }
};
```

>[Option fix: true not working on 2.1.1#248](https://github.com/webpack-contrib/eslint-loader/issues/248)

## 配置文件

配置文件名 `thunder`，[搜索位置](https://github.com/davidtheclark/cosmiconfig#cosmiconfigoptions)如下：

```
[
  'package.json',
  '.thunderrc',
  '.thunderrc.json',
  '.thunderrc.yaml',
  '.thunderrc.yml',
  '.thunderrc.js',
  'thunder.config.js',
]
```

**配置文件参数**


```js
module.exports = {
    entry: './js/index.js',
    template: './index.html',
    publicPath: '/',
    hashDigestLength: 6,
    __cacheDir: './__thunder/',
    __destination: './assets/',
    __ftp: {
        'host': 'host',
        'username': 'username',
        'password': 'password',
        'path': 'remotepath'
    }
}
```

|参数名|是否必须|描述|默认值|
|:---|:---|:---|:---|
|entry|可选|[webpack 入口起点](https://webpack.docschina.org/concepts/entry-points/|配置文件同级目录下的 `./js/index.js`|
|template|可选|[html-webpack-plugin 中的模板页面](https://github.com/jantimon/html-webpack-plugin)|配置文件同级目录下的 `index.html`|
|publicPath|可选|[此输出目录对应的公开 URL](https://webpack.docschina.org/configuration/output/#output-publicpath)|`/`|
|hashDigestLength|可选|散列摘要的前缀长度|6|
|__cacheDir|可选|缓存打包后生成的文件，用于上传及拷贝到上线目录|`./__thunder/`|
|__destination|可选|打包后实际生成目录|`./assets/`|
|__ftp|可选|ftp 配置，参考[node-scp2](https://github.com/spmjs/node-scp2)|默认不开启ftp|

**ftp配置建议：**

在配置文件中添加 `__ftp` 配置，但是将 `username`、`password` 移除；执行命令时执行

```sh
# 进入项目所在目录
cd workspacedir
# 手动添加用户名和密码
thunder --watch --username=username --password=password
thunder --build --username=username --password=password
```

## 注意事项

1. 打包后会生成 `__cacheDir` 和 `__destination` 目录，请在 `.gitignore` 中忽略掉这 2 个文件夹。
2. [context](https://webpack.docschina.org/configuration/entry-context/#context) : 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader。默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory - 当前执行路径)。

>因此无法将 `webpack` 全局安装到 `cli` 中

3. 打包后兼容 ie8，使用 `html-webpack-plugin` 时，不注入到页面中即可


## TODO

+ [ ] 本地的 `ssi` 使用 ssi-loader 打包到页面中，减少 `ssi` 的使用。
+ [ ] prefetch & preload 插件
+ [ ] performence 性能配置
+ [ ] `.browserslistrc` 配置
+ [ ] `.eslintrc` 配置
+ [ ] 添加测试
+ [ ] css minify
+ [ ] image optimization


## 阅读链接

+ [Webpack 中使用的Node.js API](https://www.jianshu.com/p/d3272c8dd9bf)
+ [Webpack progress using node.js API](https://stackoverflow.com/questions/31052991/webpack-progress-using-node-js-api)
+ [@babel/preset-env](https://babeljs.io/docs/en/next/babel-preset-env.html)
+ [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/next/babel-plugin-transform-runtime.html)
