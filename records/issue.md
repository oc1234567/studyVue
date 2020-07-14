1.vue 实例挂载元素的语法，需要使用完整版，使用运行时版本会报错

运行时+编译器 vs 只包含运行时

如果需要在客户端编译模块(比如传入一个字符串给 `template` 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就将需要加上编译器，即完整版。当使用 `vue-loader` 或 `vueify` 的时候，`*.vue` 文件内部的模板会在构建时预编译成 JavaScript。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可。

因为运行时版本相比完整版体积要小大约 30%，所以应该尽可能使用这个版本。如果你仍然希望使用完整版，则需要在打包工具里配置一个别名：

#### webpack

```javascript
module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  }
}
```

2.风格报错
  不允许对 HTML 元素进行自闭合
  ```
  <input />
  ```
  解决方法1：
  ```
  <input>
  ```
  解决方法2：
  ```
  //.eslintrc.js
  {
    rules: {
      "vue/html-self-closing": ["error", {
        "html": {
          "void": "always",
          "normal": "never",
          "component": "always"
        },
        "svg": "always",
        "math": "always"
      }]
    }
  }
  ```
  将 "void" 设为 "always"， "normal" 设为 "never"，则推荐下面写法：
  ```
  <div></div>
  <img/>
  ```
  将 "void" 设为 "never"， "normal" 设为 "always"，则推荐下面写法：
  ```
  <div/>
  <img>
  ```