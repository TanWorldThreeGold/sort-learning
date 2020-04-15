/*
1.js基础类型有哪些
string number boolean Symbol null undefined

2.数组去重的方法有哪些
function unique(arr) {
  let res = []
  for(let i = 0; i < arr.length; i++) {
    let current = arr[i]
    if (res.indexOf(current) === -1) {
      res.push(current)
    }
  }
  return res
}

function unique(arr) {
  return [...new Set(arr)]
}

function unique(arr) {
  const obj = new Map()
  return arr.filter(x => !obj.has(x) && obj.set(x, 1))
}


3.set和weakSet的区别
WeakSet只能存储对象引用，不能存放值，而Set都可以
WeakSet中的对象都是弱引用，所以WeakSet不可遍历

WeakMap键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
WeakMap应用的典型场合是DOM节点作为键名和部署私有属性，这样可以避免内存泄漏

4.es6用过哪些新特性
let const async await arr.flat 箭头函数 class map set 扩展运算符 结构 Proxy module

5.http状态码(301,302,304,401,403,405)
1xx 表示接受的请求正在处理
2xx 表示成功处理完毕
3xx 表示需要进行附加操作以完成请求
4xx 表示服务器无法处理请求
5xx 表示服务器处理请求错误

partial 局部的
permanently 永久地
temporary 暂时的
unauthorized 未经许可的
forbidden 禁止
internal 内部的
unavailable 不能利用的

200 OK 表示从客户端发来的请求在服务器端被正常处理了
204 No Content 表示请求已成功处理，但在返回的响应报文中不含实体的主体部分
206 Partial Content 表示客户端进行了范围请求，而服务器成功执行了这部分的GET请求
301 Moved Permanently 永久性重定向。表示请求的资源已被分配了新的URI，以后应使用资源现在所指的URI
302 Found 临时性重定向。表示请求的资源已被分配了新的URI，希望用户能使用新的URI访问
303 See Other 表示由于请求对应的资源存在着另一个URI，应使用GET方法定向获取请求的资源
304 Not Modified 表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况
307 Temporary Redirect 临时重定向。与302类似
400 Bad Request 表示请求报文中存在语法错误
401 Unauthorized 表示发送的请求需要有通过HTTP认证的认证信息。若之前已进行过一次请求，则表示用户认证失败
403 Forbidden 表示对请求资源的访问被服务器拒绝了
404 Not Found 表示服务器上无法找到请求的资源
500 Internal Server Error 表明服务器端在执行请求时发生了错误
503 Service Unavailable 表示服务器暂时处于超负载或正在进行停机维护，无法处理请求

6.http1与http1.1的区别，用过HTTPS嘛，为什么说它更安全，用的什么加密方式
缓存处理，在HTTP1.0中主要使用header里的If-Modified-Since，Expires来作为缓存判断的标准。
HTTP1.1则引入了Entity tag，If-Match，If-None-match等更多可供选择的缓存头来控制缓存策略

带宽优化及网络连接的使用，HTTP1.0中存在浪费带宽的现象，如果客户端需要某个对象的一部分，服务器会将整个对象返回，并且不支持断点续传功能
HTTP1.1在请求头引入了range头域，允许只请求资源的某个部分。即返回码是206

错误通知的管理，在HTTP1.1中新增了24个错误状态响应码

Host头处理，在HTTP1.0中认为每天服务器都绑定一个唯一的IP地址，所以请求信息不会传主机名
HTTP1.1中的请求消息和响应消息都支持Host头域，且请求信息没有Host头域会报400

长连接 HTTP1.1支持长连接和请求的流水线处理，在一个TCP连接上可以传递多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟
在HTTP1.1中默认开启Connection:keep-alive

HTTP协议运行在TCP之上，所有传输的内容都是明文，HTTPS运行在SSL/TLS之上，SSL/TLS运行在TCP之上，所有传输的内容都经过加密
HTTP和HTTPS使用的是完全不同的连接方式，端口不同，前者80，后者443
HTTPS可以有效的防止运营商劫持

HTTP2.0和HTTP1.x区别
新的二进制格式
多路复用
header压缩
服务端推送

7.浏览器缓存(强缓存、协商缓存)
强缓存命中的话不会发请求到服务器(200 from memory cache)
协商缓存一定会发请求到服务器，通过资源的请求首部字段验证资源是否命中协商缓存(304 not modified)
首先检查强缓存 1.0 Expires 1.1 Cache-Control(no-cache no-store public private max-age)
然后检查协商缓存 Last-Modified/If-Modified-Since（Last-Modified时间早于或等于If-Modified-Since则会返回304） 
ETag/If-None-match（优先级比Last-Modified高）

缓存位置：Service Worker | Memory Cache 内存中的缓存 | Disk Cache 磁盘中的缓存 | Push Cache


8.为什么握手需要3次，挥手需要4次
握手3次是因为2次无法确认客户端的接收能力，4次多余了
挥手4次是因为如果是3次的话，长时间的延迟可能会导致客户端误以为FIN没有到达客户端，从而让客户端不断重发FIN

9.如何解决跨域问题
同源策略限制的行为：
Cookie、LocalStorage和IndexDB无法读取
DOM和JS对象无法获取
Ajax请求发送不出去

域名端口、协议有一个不同就是跨域

jsonp document.domain + iframe CORS(简单请求和非简单请求 Access-Control-Allow-Origin) script标签 iframe nginx代理等 修改header postMessage nodejs中间件代理 WebSocket协议

10.跨域可以携带cookie嘛？如果可以，前后端需要怎么设置
浏览器不允许cookie跨域传值
设置Accss-Control-Allow-origin
Access-Control-Allow-Credentials

11.说说vue和react的区别
数据流的不同
HoC和mixins
组件通信的区别
模板渲染方式不同
Vuex和Redux区别

12.vue的inject,provide
可以获取后代元素的数据

13.vue的具名插槽功能
需要多个插槽时使用，通过slot标签上的name来区别

14.说说用TS有什么好处，interface和type的区别，never类型什么时候会用到
限制类别
从开发效率上
从可维护性
从线上运行时质量上

interface和type都可以描述一个对象或者函数，都允许扩展
但是type可以声明基本类型别名，联合类型，元祖等类型
type中还可以使用typeof获取实例的类型进行赋值

interface可以声明合并

interface是接口，需要有方法来实现，type是类似枚举
never在函数返回抛出异常时用到，或者推断的返回类型为never，返回never的函数必须存在无法达到的终点

15.中间定宽，如何实现两边平分剩余的宽度，有几种实现方法
1.绝对定位
2.浮动
3.flex
4.grid

16.将数字12345678转化成：12,345,678
str = str.split('').reverse()
for(let i = 0; i < str.length; i++) {
  if ((i+1)%4 == 0) {
    str.splice(i, 0, ',')
  }
}
str.reverse()

17.vue通过数据劫持就能知道哪些数据发生了变化，为什么还需要diff算法?
Vue通过数据绑定来修改视图，当某个数据被修改的时候，set方法会让闭包中的Dep调用notify通知所有订阅者Watcher，
Watcher通过get方法执行vm._update(vm._render())
patch将新老VNode节点进行比对，然后将根据两者的比较结果进行最小单位地修改视图，而不是将整个视图根据新的VNode重绘
patch的核心在于diff算法，可以高效地比较viturl DOM的变更，得出变化以修改视图
diff算法是通过同层的树节点进行比较而不是对树进行逐层搜索遍历的方式，所以时间复杂度只有O(n)
如果是相同节点，那么会进行patchVnode，否则就是创建新的DOM，移除旧的DOM
规则如下：
1.如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），并且新的VNode是clone或者是标记了once，那么只需要替换elm以及componentInstance即可
2.新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren，这个updateChildren也是diff的核心
3.如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点
4.当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点
5.当新老节点都无子节点的时候，只是文本的替换

updateChildren


18.现在公司的团队情况，产品情况，你在公司负责什么

19.你是如何提高开发效率的

20.说说你做的比较好的项目

21.平时怎么做性能优化的

22.是怎么学前端的

23.为什么想转行

24.为什么想来我们公司

25.有关于原型链、this指向的考题

26.css的权重排序
元素选择符： 1
class选择符： 10
id选择符： 100
元素标签： 1000
!important最高
如果优先级相同，则选择最后出现的样式
继承得到的样式的优先级最低

27.如何实现script的延迟加载
defer async

28.hashRouter和browserRouter原理和区别

29.vue 实现按需加载的原理
webpack 实现 jsonp

30.instanceof 实现原理
toString.call(Array) === '[object Date]'

31.说说vue的双向绑定原理

32.vue的diff算法和react的diff算法区别

33.promise 限制并发数

34.什么是防抖，什么情况下会用到
防抖是防止点击按钮，一次点了多下

35.两个有序数组如何拼成一个有序的数组

36.说说你做的比较好的一个项目(从需求分析，技术选型，碰到什么问题，怎么解决，有什么价值)

37.有什么想问的

38.你们的权限系统是怎么设计的

39.用户信息和路由信息的数据结构是什么设计的

40.平时业务方面的组件是怎么封装的

41.你转行前的学的哪些东西，是在前端领域可以用的到的

42.如何做首屏优化的

43.什么是闭包，平时怎么用的
在一个函数作用域里调用外面作用域的变量

44.同时发出A B C三个请求, 如果有一个请求超时，就取消这次请求，如何设计

45.知道DNS劫持吗？怎么防止DNS被劫持

46.浏览器输入URL后过程说一下
DNS 三次握手 HTTP发送请求 服务器响应 DOM CSSOM 重绘 回流 （画图）

47.有做过性能监控吗，怎么做的

48.vue的生命周期说一下
created beforeCreate beforeUpdate updated beforeMount mounted beforeDestroy destoryed activity deactivity errorcatch

49.一个数组里，如何找出最大值，有几种办法，越多越好(遍历，排序，Math.max)

50.二分查找的时间复杂度是多少
On(logn)

51.说一下实现bind函数的思路
用apply

52.箭头函数的this，是在定义时确定的还是运行时确定的
定义时确定的

53.用过webpack吗？怎么提高打包性能？

54.webpack的loader和plugin是用来干嘛的

55.如何不用递归，实现二叉树的前序遍历

56.说说垃圾回收机制(这块之前没怎么了解过，然后我说了什么情况下可能会发生内存泄漏的情况)

57.用node怎么处理大文件读写问题

58.说说node的事件管理

59.从数组中找出三数之和为n

60.说下koa的洋葱圈模型，有什么好处，如果不调用next,会发生什么

61.正则会吗，平时用正则来处理什么问题

62.用CSS隐藏元素的方式有哪些

63.display:none 和visiblity:hidden的区别
display:none dom上没有这个节点，并且无法触发事件
visiblity:hidden dom上还是有这个节点，无法触发事件 不会触发回流

64.数组结构如何转换成树结构，说说思路

65.表单可以跨域吗

66.如果让你设计饿了么的外卖系统，你会怎么设计，有哪些需要考虑的(这里考的是对业务的理解，送外卖，就是想的要怎么能尽快把外卖送到客户手里，怎么调度配送员，需要考虑到一些路况信息、天气情况之类到)

67.你们平时是怎么提交代码，git flow了解吗？

68.前端测试是怎么做的

69.自己对公司要哪些贡献

70.for in、 for of、 Object.keys区别
for in
遍历对象及其原型链上可枚举的属性
如果用于遍历数组，处理遍历其元素外，还会遍历开发者对数组对象自定义的可枚举属性及其原型链上的可枚举属性
遍历对象返回的属性名和遍历数组返回的索引都是string类型
所以不推荐用for in遍历数组

for of
支持遍历数组，类数组对象，字符串，Map对象，Set对象
不支持遍历普通对象
遍历后输出的结果为数组元素的值

Object.keys
返回对象自身可枚举属性组成的数组
不会遍历对象原型链上的属性以及Symbol属性
对数组的遍历顺序和for in一致
*/
