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

3.vue 子组件 data 数据不刷新，变更为 computed 数据 \n
  TodoItem 子组件中包含 input 元素：
  ```
  <input :id="id" type="checkbox":checked="isDone" class="checkbox" @change="$emit('checkbox-changed')" />
  ```
  data 数据中的 isDone 依赖 this.done：
  ```
  export default {
  props: {
    id: { required: true, type: String },
    label: { required: true, type: String },
    done: { default: false, type: Boolean }
  },
  data() {
    return {
      isDone: this.done
    };
  },
  }
  ```
  如果选中一个未选中的 todoItem 项(或者取消选中一个已选中的项)，再点击 Edit 按钮，然后点击取消，会出现一个bug，即选中状态消失了(或者选中状态仍存在)。这是因为 data 中的 isDone 数据只在组件加载成功后从 this.done 中获取值，之后便不再更新。
  修复这个问题可以用两种方法：
  - 将 isDone 设置为 `计算属性`，这样 isDone 就可以根据 this.done 的变化而变化
  ```
  computed: {
    isDone() {
      return this.done;
    }
  }
  ```
  - 将 input 元素 :checked 值改为 "done"
  ```
  <input ... :checked="done" />
  ```
4.vue 的 Virtual DOM 机制会优化和批处理数据的更新，在执行 this.idEditing = false 之后，页面是延迟更新的。此时 this.refs.editButton = undefined，需要在下次更新周期时页面出现 Edit 按钮才重新绑定(在点击 Edit 之后，v-if 执行，Edit 按钮从界面中移除，Edit 按钮的 ref 解绑 ，所以 this.refs.editButton = undefined)，所以需要将 this.refs.editButton.focus() 放在 this.$nextTick 中执行。
  ```
  this.$nextTick(() => {
    const editButtonRef = this.$refs.editButton;
    editButtonRef.focus();
  })
  ```
5.Vue 的生命周期函数不能使用箭头函数 \n
  使用箭头函数无法访问 this
