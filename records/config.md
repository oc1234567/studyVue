1.webpack 与 vue-loader 配置

vue-loader 编译 vue 文件，可以使用运行时模块

2.eslint 与 eslint-plugin-vue 配置

使用 eslint 对代码风格进行规范
vue 官方提供 eslint-plugin-vue 插件
步骤1：
npm install --save-dev eslint eslint-plugin-vue@next
步骤2：
touch .eslintrc.js
```
//.eslintrc.js
module.exports = {
    extends: [
        'plugin:vue/vue3-recommended'
    ], 
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
    }
}
```
步骤3：
eslint --ext .js,.vue src 
或者：
eslint "src/**/*.{js,vue}"
接下来，命令行会对.js文件和.vue文件进行风格检查，参照vue.js的风格指南进行更改即可
因为项目使用了 babel-eslint 解析器，需要对 .eslintrc.js 文件内容进行修改：
```
- "parser": "babel-eslint",
+ "parser": "vue-eslint-parser",
  "parserOptions": {
+     "parser": "babel-eslint",
      "sourceType": "module"
  }
```
因为 eslint-plugin-vue 插件需要使用 vue-eslint-parser 解析器对 .vue 文件进行解析，因此不可以覆盖 parser 选项。

3.babel-preset-jsx 配置
定义组件：
```
Vue.component('TodoItem', {
    props: ['todo'], 
    render: function(createElement) {
        return createElement('li', this.todo.text)
    }
})
```
使用渲染函数的时候，SX 语法比 createElement 的语法简洁的多，因此引入 babel-preset-jsx 预设配置，方便在 vue 中使用 JSX 语法。
步骤1：
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
步骤2：
touch .babelrc.js
```
//.babelrc.js
module.exports = {
    presets: [
        "@vue/babel-preset-jsx"
    ]
}
```
步骤3：
定义组件：
```
Vue.component('TodoItem', {
    props: ['todo'],
    render() {
        return <li>{ this.todo.text }</li>
    }
})
```
补充：
使用 pre-commit 钩子