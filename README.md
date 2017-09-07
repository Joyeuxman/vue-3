## vue-3
使用vue模仿ele.me  [源码](https://github.com/bailicangdu/vue2-elm)

2017-9-1  以大多数人的努力程度之低，没必要拼天赋哟


### 技术栈
vue2-webpack-vuex-vueRouter-flex-svg


### 问题
* id=app、router-view标签为什么在根目录的index.html页面和App.vue文件中重复出现两次
* 代理的饿了吗后台好像不太稳定，有时候会出现请求失败，状态码为430
* @import "@/style/mixin"报错(url-loader与webapck的alias是两种不同的url解析方式???)
* vue代码进行调试的时候，总感觉有些卡顿
* router的模式为history的时候，会影响回退页面的滚动条的起始位置(样式异常),切换为hash模式就好了
* 目前发现v-bind指令可以将data返回的属性值绑定到标签属性上
* 目前发现v-on指令可以触发监听的函数方法<br>
1.methods对象中定义的函数方法<br>
2.原生DOM事件，如表单的submit动作，阻止表单的默认提交--> v-on:submit.prevent<br>


### 知识点
* `hash`与`history`两种模式的区别<br>
`hash`模式路由地址会带上#,但是浏览器发送给服务器的却是#之前的URL。hash模式的好处是，虽然你是个单页面应用，但是你可以只刷新当前页，而不必刷新整个单页面应用。<br>
`history`模式的话需要服务端配合，如果服务器配置仅仅是找不到对应的路由，就会重定向到index.html，那么刷新当前页会跳首页。如果服务器对于匹配不到URL不做配置，那么一般返回404页面。

* `v-for`指令可用于遍历数组和对象。<br>
遍历数组时： `(item,index) in arr`<br>
遍历对象时： `(value,key,index) in obj`<br>

* `slot`标签用于父组件向子组件分发想要显示的内容。<br>
使用场景:几个父组件公用一个子组件，且想要该子组件在不同的父组件中显示不同的内容。

* `v-model`用于绑定表单控件元素，如`input、textarea、select`<br>
1.`textarea/input[type=text]`，将data返回的属性值双向绑定到input的value属性上<br>
2.`input[type=checkbox]/input[type=radio]/select-option`<br>
  a.以上元素有value属性时，将data返回的属性值双向绑定到input的value属性上<br>
  b.以上元素无value属性时，将data返回的属性值双向绑定到以上元素是否被选中，选中为true，未选中为false<br>

* `v-if/v-show/slot`标签都不会在文档排版中占位置，即不会像opacity样式那样占位置。

* `v-if`与`v-show`区别<br>
`v-show` 会在app初始化的时候编译并且渲染，并且在之后一直存在。当切换v-show模块时，只是简单的更改css。<br>
`v-if` 当切换v-if模块时，Vue.js 有一个局部编译/卸载过程，因为 v-if 之中的模板也可能包括数据绑定或子组件。v-if 是真实的条件渲染，因为它会确保条件块在切换当中合适地销毁与重建条件块内的事件监听器和子组件。 v-if 是惰性的，如果为false，则什么也不错-不编译，不渲染。 当第一次条件为真时，才开始编译。
#####建议#####
`v-show`的切换消耗比较低，但是不会重新渲染子组件，所以最好用于静态的内容或者不需要重新构建结构的组件。而 v-if 比较适合不太频繁的切换状态的组件。所以项目设计的时候，不要对复杂的业务设计模块太频繁的视图切换。尽量将静态内容和动态内容分离到不同的模块中。<br>
一般来说，v-if 有更高的切换消耗而 v-show 有更高的初始渲染消耗。因此，如果需要频繁切换 v-show 较好，如果在运行时条件不大可能改变 v-if 较好


### 不足
* 需要系统学习一下svg
* 强化一下flex布局