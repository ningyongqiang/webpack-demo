### 依赖图dependency graph

* 一个文件A依赖另一个文件，webpack就会认为文件A存在依赖关系。引入的图片，字体包之类的也不例外。
* webpack会根据命令行中的参数或者配置文件中早已定义的<font color='red'>模块</font>列表开始处理，已定义的<font color='red'>入口</font>文件开始递归，构建一个 [依赖关系图](https://webpack.docschina.org/concepts/dependency-graph/)
* 这些<font color="red">依赖图</font>包含着前端项目所需的每个<font color='red'>模块</font>。
* 然后webpack将所有<font color='red'>模块</font>打包为少量的<font color="red">bundle</font>。
* 供浏览器加载。

### 术语解释

* 模块Modules

  webpack天生支持`ES6` `CommonJS` `AMD` 等，

* chunk

  webpack运行时内部的概念

  打包过程中被操作的模块文件

* bundle

  最后打包之后的文件，有可能和chunk长的一样
  
* Source map

  Source map是浏览器提供的功能，我们能主动添加，也可以在打包之后的文件中添加下面注释，向浏览器指示源映射

  ```javascript
  //# sourceMappingURL=/path/to/script.js.map
  ```

  如果将三个源文件（a.js、b.js、c.js）打包到一个 `bundle.js`中，而其中一个源文件包含一个错误，那么堆栈跟踪就会直接指向到`bundle.js`，你就不能准确的追踪到错误信息在哪个源文件。

  开启映射

  ```javascript
  module.exports = {
    'devtool': 'inline-source-map'
  }
  ```

* Tree shaking

  在ES2015静态import下，移除js上下文中未引用代码(dead-code)，就叫Tree shaking。

  不同的打包工具有不同的做法。

* side effect（副作用）

  > "side effect(副作用)" 的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。

例子：

```javascript
module.exports = {
  entry: {
    main: ['./src/main.js', './src/test.js'],
    other: ['./src/other.js']
  },
  output: {
    filename: [name].bundle.js
  }
}
```

其中`./src/main.js`中引入了global.css

| Modules                                | Chunk       | Bundle                          |
| -------------------------------------- | ----------- | ------------------------------- |
| main.js、test.js、other.js、global.css | Main、other | main.bundle.js、other.bundle.js |

### 核心概念

* 入口entry

  依赖图的开始。进入入口文件后，webpack会找出哪些模块和库是入口起点直接和间接依赖的。

  默认值为`./src/index.js`

  ```javascript
  module.exports = {
    entry: './path/to/my/entry/file.js'
  }
  ```

* 输出output

  output属性告诉webpack在哪里输出它创建的<font color="red">bundle</font>，以及如何命名。

  默认值为`./dist/main.js`

  ```javascript
  const path = require('path')
  module.exports = {
    entry: './path/to/my/entry/file.js',
    output: {
      path: path.resolve(__diename, 'dist'),
      filename: 'my-first-webpack.bundle.js'
    }
  }
  ```

* Loader

  webpack只能够理解`JavaScript` `JSON` 文件，这是webpack开箱即用的功能。

  loader让webpack有能力去处理其他类型的文件，让这些文件转化为有效的<font color="red">模块Modules</font>，添加到<font color="red">依赖图</font>中，以供程序使用。

  有两个属性，`test	`用正则匹配，识别出要被转换的文件。`use`决定要用哪个`loader`

  ```javascript
  module.exports = {
    module: {
      rules: [
        { test: /\.vue$/, use: 'vue-loader' }
      ]
    }
  }
  ```

* Plugin

  loader是让特定类型的文件转化为模块，plugin用来执行范围更广的任务，包括：打包优化、资源管理、注入环境变量

  webpack附带了各种内置插件，通过`webpack.[plugin-name]`访问。

  例如：`DefinePlugin` 允许在 **编译时** 创建配置的全局常量

  ```js
  module.exports = {
    //...
    plugins: [
      new webpack.DefinePlugin({
        // 每个键都是一个标识符或多个以 . 连接的标识符
        VERSION: JSON.stringify('5fa3b9')，
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  };
  ```

  ```javascript
  console.log('Running App version ' + VERSION);
  // Prints: '5fa3b9'
  ```

  社区里面还有很多插件

  ```javascript
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  module.exports = {
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' })
    ]
  }
  ```

  在上面的示例中，`html-webpack-plugin` 为应用程序生成一个 HTML 文件，并自动注入所有生成的 bundle

  `copy-webpack-plugin`将单个文件或者整个目录（已存在）复制到构建目录。`vue-cli@2.0` 中的static文件夹、 `vue-cli@3.0`中的public文件夹。

* Mode（模式）

  `string = 'production': 'none'| 'development' | 'production'`
  
  告诉webpack使用相应模式的内置优化

* 环境

  webpack 5 运行于 Node.js v10.13.0+ 的版本

### 配置

1. 开箱即用

   从webpack `v4` 开始，不用任何配置就能直接使用，默认入口为`src/index.js`，然后会在`dist/main.js`输出结果，并且在生产环境下开启压缩和优化。

2. 自定义扩展

   2.1 根目录下创建`webpack.config.js`，webpack会自动使用它。

   2.2 也可以创建其他名字的文件（例如`prod.config.js` `dev.config.js`用来应对特定的情况），在命令行中使用`--config`应用配置文件

   ***package.json***

   ```javascript
   "script": {
     "build": "webpack --config prod.config.js"
   }
   ```

   2.3 也可以使用`Typescript` `Babel` `JSX` 书写配置文件

3. 配置选项

   3.1 配置方式

   	3.1.1 使用common.js抛出一个对象（导出单个配置）
   	
   	3.1.2 导出函数
   	
   	3.1.3 导出Promise
   	
   	3.1.4 导出多种配置（Array）

   3.2 使用node提供的`__dirname`全局变量来表示当前模块的目录名称。

   示例：在`/Users/ning/mjr`中执行`node example.js`

   ```javascript
   console.log(__dirname)
   // Prints: /Users/ning/mjr
   ```

   3.3 快速生成webpack配置

   ```shell
   mkdir webpack-demo
   cd webpack-demo
   npm init -y
   npm install webpack webpack-cli --save-dev
   npx webpack-cli init
   ```
   
   执行上面命令会在创建配置文件之前询问问题：
   
   * 是否生成多个bundle？
   * 用哪个当入口文件？
   * 用哪个文件夹储存bundle？
   * 使用哪种js的解决方案？
   * 使用哪种css的解决方案？
   * 是否使用MiniCssExtractPlugin?
   * ...等

### 使用

* 管理资源

  webpack除了引入`javascript` 模块以外，可以使用loader引入其他的非`javascript`模块。

  比如css、image、font等

  特别注意的是，在`webpack5`中增加了*资源模块*的概念，它允许你使用资源文件，而无需配置额外的loader。

  例如：`file-loader`

  ```js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader'
        },
      ],
    },
  };
  ```

  但是`webpack5`中需要以下配置：

  ```js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/,
          type: 'asset/resource'
        },
      ],
    },
  };
  ```

  结果：

  ```js
  import img from '../public/WechatIMG44.jpeg'
  console.log(img) // echo /9df17198adb4a1736396.jpeg
  ```

  

* 管理输出

  我们现在是在`index.html`手动引入bundle，但是万一使用多个bundle，或者在文件名中使用hash，手动管理`index.html`就会很困难。

  [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)

  也可以使用HtmlWebpackPlugin生成多个html，但要考虑不同的html引用不同的chunk

  [CleanWebpackPlugin](https://github.com/johnagan/clean-webpack-plugin)

* 开发环境

  使用[webpack-dev-server](https://webpack.docschina.org/configuration/dev-server/)
  
  ***这里着重介绍下*** `output.publicPath` `devServer.publicPath` `devServer.contentBase`
  
  * `output.publicPath`这个值是决定index.html中引用bundle的相对路径，相对于index.html。
  
  Index.html
  
  ```javascript
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index</title>
  </head>
  <body>
    
  <script src="/index.bde1a45ddb350ce470a9.bundle.js"></script></body>
  </html>
  ```
  
  webpack.config.js
  
  ```javascript
  output: {
    publicPath: '/'
  },
  ```
  
  * `devServer.publicPath` 
  
  webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 outPut.publicPath输出的bundle 文件保留（映射）在内存中。devServer.publicPath决定这个虚拟bundle的绝对路径。
  
  * `devServer.contentBase`
  
  告诉webpack-dev-server从哪里提供内容，默认当前服务器启动的根目录。一般不需要修改。