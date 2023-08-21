Node.js：服务器端 JavaScript 运行时环境。

Node.js 建立在 Google Chrome V8 JavaScript 引擎之上，主要用于创建网络服务器。

<img src="/Users/liruixiao/Library/Application Support/typora-user-images/image-20230819005400181.png" alt="image-tech list" style="zoom:50%;" />

学习框架的基础

<img src="/Users/liruixiao/Library/Application Support/typora-user-images/image-20230819005606610.png" alt="image-content" style="zoom:50%;" />

计算机组成结构、程序运行流程、进程和线程、同步和异步、IP和端口

## 简介与安装

nodejs是一个开源的、跨平台的JS运行环境，即一款可以运行JS的应用程序。

`node.js`可以用来做小程序、APP、网站、游戏的**服务端**：部署项目到服务器中，让别人也能访问。

- 开发服务端应用

- 开发工具类应用：webpack、vite、babel

- 开发桌面端应用：electron=》vs code、figma、postman

### 

下载：在[官网](https://nodejs.org/en)下载，或者使用在终端中使用nvm来下载和管理node

```sh
#NVM(Node Version Manager)是用于管理多个Node.js版本的工具
#安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
#安装最新版
nvm install stable
#升级到最新
nvm install-latest-npm 
#版本
nvm ls
#使用、切换
nvm use <版本号>
#切换到默认版本
nvm alias default <版本号>
#卸载版本
nvm uninstall <版本号>
```

<img src="/Users/liruixiao/Library/Application Support/typora-user-images/image-20230819141146275.png" alt="image-20230819141146275" style="zoom:50%;" />

在node中不能使用DOM、BOM的API

node.js中顶级对象为global，也可以用globalThis访问顶级对象

<img src="/Users/liruixiao/Library/Application Support/typora-user-images/image-20230819141203600.png" alt="image-20230819141203600" style="zoom:50%;" />

### Buffer

buffer中文为“缓冲区”，是一个类似Array的对象，用于表示固定长度的字节序列，换句话说，buffer就是一段固定长度的内存空间，用于处理二进制数据

特点：大小固定且无法调整；性能较好，可以直接对计算机内存进行操作；每个元素为1字节（byte）

**使用**

创建：alloc、allocUnsafe、from

allocUnsafe会包含旧的程序遗留的数据；速度会比alloc快，因为你不需要做归零

```js
let buf = Buffer.alloc(10)
```

![image-20230819142827839](/Users/liruixiao/Library/Application Support/typora-user-images/image-20230819142827839.png)

与字符串的转化：buf.toString()

读写

跟读写数组差不多

溢出（舍弃高位数字

中文（utf-8的一个中文等于三个字符）

![image-20230820014923827](/Users/liruixiao/Library/Application Support/typora-user-images/image-20230820014923827.png)

## fs模块

fs：file system

实现与硬盘的交互，例如文件的创建、删除、重命名、移动；文件的写入、读取、文件夹相关操作

```js
//导入fs模块
const fs = require('fs')
//写入文件
fs.writeFile('file','content',err=>{
  //err写入失败：错误对象；写入成功：null
  if(err){
    console.log('写入失败')
    return
  }else{
    console.log('写入成功')
  }
})
```

fs异步与同步

I/O——输入输出线程

```js
const fs = require('fs')
fs.writeFileSync('file','content')
```

追加文件appendFile：路径、内容、配置、回调函数；

程序的日志



#### 流式写入

语法：`fs.createWriteStream(path[,options])`

返回值：object

```js
let fs = require.createWriteStream('./cat.txt')
fs.write('xaiomao\r\n')
fs.write('')
fs.end
```

> 程序打开一个文件是需要消耗资源的，流式写入可以减少打开关闭文件的次数。
>
> 流式写入适用于大文件or频繁写入的场景，write File适合于写入频率较低的场景

写入文件的场景

当需要持久化保存数据的时候，应该想到文件写入

- 下载文件
- 安装文件
- 保存程序日志，如git
- 编辑器保存文件

文件读取

readFile异步读取——`readFile(path[,option],callback)`

readFileSync同步读取——同上

createFileStream流式读取——适用于大文件

```js
//导入fs模块
const fs = require('fs')
//创建一个可读流
let rs = createFileStream('path')
//监听流的开启和关闭
rs.once('open',()=>{
  console.log('可读流开启了')
})
rs.once('close',()=>{
  console.log('可读流结束了')
})
//如果读取一个可读流中的数据，必须要为可读流绑定一个data事件，它会自动化开始读取数据
rs.on('data',(data)=>{
  console.log(data.length)
})
//end,可选事件
rs.on('end',()=>{})

```

读取文件的场景

- 电脑开机、程序运行、编辑器打开文件
- 查看图片、播放视频、浏览照片
- git查看日志
- 上传文件
- 查看聊天记录

文件复制：

```js
//import
const fs = require('fs')
//read
const data = fs.readFileSync('filename')
//write
fs.writeFileSync('filename',data)
//流式操作——读取速度更快
const rs = readFileStream('filename')
const ws = writeFileStream('filename')
rs.on('data',chunk =>{
  ws.write(chunk)
})
//pipe()可以将可读流中的数据直接输入到可写流中
rs.pipe(ws)
```



重命名、移动：rename；旧路径、新路径、回调函数

批量重命名：

```js
const fs =require('fs')
const files = readdirSync('./code')
console.log(files)
//
files.forEach((item)=>{
  //先拆分文件名，后判断
  let data = item.split('-')
  let [num, name] = data
  if(Number(num)<10){
    num = '0' + num
  }
  //创建新文件名；重命名
  let newname = 'num' + '-' + name
  fs.renameSync(`./code/${item}`,`./code${newname}`)
})
```



导入fs模块

读取文件夹内容

遍历数组

删除：unlink(路径，回调函数)、unlinkSync；rm(路径，回调函数)、rmSync

文件夹操作：

| 方法                                                     | 说明 |
| -------------------------------------------------------- | ---- |
| mkdir(path[,options],callback)/mkdirSync(path[,options]) | 创建 |
| readdir/readdirSync                                      | 读取 |
| rmdir/rmdirSync(path)                                    | 删除 |

```js
//递归创建文件夹;删除同理（但不推荐递归删除）
fs.mkdir('./a/b/c',{recursive: true},err=>{})
//读取文件夹内容
fs.readdir('./',(err,data）=>{})
```



**查看资源状态**

stat('filename',callback);callback-args:err、data



**路径补充**：相对（参照的路径是工作路径而非文件路径）、绝对

_dirname，与require类似，都是node.js环境中的全局变量；保存着当前文件所在目录的绝对路径，可以使用`_dirname`来与文加密ing拼接成绝对路径。

> 使用fs模块时，尽量使用_dirname将路径转换为绝对路径，这样可以避免路径产生的bug

```js
let data = fs.readFileSync(_dirname + '/data.txt')
console.log(data)
```

## path模块

| API             | 说明                     |
| :-------------- | ------------------------ |
| path.resolve()  | 拼接规范的绝对路径       |
| path.sep()      | 获取操作系统的路径分隔符 |
| path.parse()    | 解析路径并返回对象       |
| path.basename() | 获取路径的基本名称       |
| path.dirname()  | 获取路径的目录名         |
| path.extname()  | 获取路径的拓展名         |

```js
//导入path模块
const path = require('path')
path.resolve(__dirname,'./index.html')
```



### 计算机基础

基本构成：CPU、内存（读写速度快，断电就丢）、硬盘（速度慢，不丢失数据）；主板、显卡

程序运行基本流程：

硬件、操作系统（应用程序，用来管理和调度硬件资源；硬盘——》内存——〉cpu——显卡、声卡等

进程、线程：进程——进行中的程序（程序的一次执行过程）windows任务管理器；macOS活动监视器。线程是一个进程中执行的一个执行流；一个线程是属于某个进程

<img src="/Users/liruixiao/Library/Application Support/typora-user-images/image-20230820081612653.png" alt="image-20230820081612653" style="zoom:50%;" />





### 网络概念

#### IP

IP地址，本身是一个数字标识，用来标志网络设备，寻找网络地址，实现设备间通信。

IPV4:2^4，32位bit，拆分为四个字节，用点连接，192.168.1.3

国际互联网是IPV6（128位）

<img src="/Users/liruixiao/Library/Application Support/typora-user-images/image-20230821121446388.png" alt="image-20230821121446388" style="zoom:50%;" />

解决IP不够使用：通过路由共享公网IP（共享成员内部为局域网IP、私网IP）

<img src="/Users/liruixiao/Library/Application Support/typora-user-images/image-20230821122919798.png" alt="image-20230821122919798" style="zoom:50%;" />

本地回环IP：127.0.0.1~127.255.255.254，都是指向本机

<img src="/Users/liruixiao/Library/Application Support/typora-user-images/image-20230821123129193.png" alt="image-20230821123129193" style="zoom:50%;" />

#### 端口

应用程序的数字标识

一台计算机有65536个端口（0～65535）

一个应用程序可以使用一个或多个端口

端口作用：实现不同主机应用程序的之间的通信

### HTTP协议

> HTTP：Hypertext Transfer Protocol——超文本传输协议，互联网应用最广泛的协议之一。
>
> 协议：双方（浏览器和服务器）共同遵守的一种预定。

<img src="/Users/liruixiao/Library/Application Support/typora-user-images/image-20230821111001974.png" alt="image-20230821111001974" style="zoom:50%;" />

HTTP报文

安装Charles/proxy，充当代理角色，可以查看报文

中间件抓包？

#### 请求报文

1. 请求行：请求方法、URL、HTTP版本号

   - |            方法            |       作用       |
     | :------------------------: | :--------------: |
     |        GET（常用）         | 主要用于获取数据 |
     |        POST（常用）        |    ～新增数据    |
     |         PUT/PATCH          |    ～更新数据    |
     |           DELETE           |    ～删除数据    |
     | HEAD/OPTIONS/CONNECT/TRACE |     较少使用     |

   - URL：Uniform Resource Locator——统一资源定位符，本身是一个字符串。

   ​          协议名://主机名(或IP地址):端口号/路径?查询字符串

   <img src="/Users/liruixiao/Library/Application Support/typora-user-images/image-20230821114346373.png" alt="image-20230821114346373" style="zoom:50%;" />

   - | 版本号 | 发布时间 |
     | :----: | :------: |
     |  1.0   |   1996   |
     |  1.1   |   1999   |
     |   2    |   2015   |
     |   3    |   2018   |

2. 请求头：一对对键值对；

   - 记录浏览器的相关信息：user-agent浏览器品牌、版本号；accept浏览器能处理的数据类型（-encoding压缩方式；-language语言）

   - 交互行为：connection保持连接通道、提高效率；
   - 与请求体相关的信息

3. 请求体：内容格式非常灵活

<img src="/Users/liruixiao/Library/Application Support/typora-user-images/image-20230821113303012.png" alt="image-20230821113303012" style="zoom:50%;" />

#### 响应报文

1. 响应行：HTTP版本号、[响应状态码](https://www.runoob.com/http/http-status-codes.html)、响应状态描述
2. 响应头：与服务器相关的内容、与响应体相关的内容
3. 响应体：内容格式非常灵活，常见有HTML、CSS、JavaScript、图片、视频、JSON

<img src="/Users/liruixiao/Library/Application Support/typora-user-images/image-20230821120129420.png" alt="image-20230821120129420" style="zoom:50%;" />

### HTTP模块

角色转换为后端开发，处理浏览器发送的请求

```js
//导入http模块
const http = require('http')

//创建服务对象
const server = http.createServer((require,response)=>{
  //设置响应头
  response.setHeader('content-type', 'text/html;charset-utf-8')
  //设置响应体
  response.end('hello, http server')
})

//监听端口，启动服务
server.listen(9000,()=>{
  //端口成功启动后才会调用的函数
})
```

⚠️注意事项

1. ﻿﻿﻿命令行 ctr1 + c停止服务
2. ﻿﻿当服务启动后，更新代码 必须重启服务才能生效了．响应内容中文乱码的解决办法
    response.setHeader ( content-type', 'text/html;charset=utf-8');

1. ﻿﻿﻿端口号被占用
    Error: listen EADDRINUSE : address already in use : ::9000
    1）关闭当前正在运行监听端口的服务（使用较多）
    2）修改其他端口号
2. ﻿﻿﻿HTTP 协议默认端口是 80。HTTPS的默认端口是443。HTTP 服务开发常用端口有 3000，8080，8090，9000 等

> 如果端口被其他程序占用，可以使用`资源监视器`找到占用端口的程序，然后使用`任务管理器`关闭对应的程序

浏览器查看

开发者工具》网络〉

提取HTTP请求报文

Require.method请求方法

Require.url路径和查询字符

require.headers请求头‘

绑定事件获取请求体

[050_http模块_获取请求路径与查询字符串(新)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1gM411W7ex/?p=50&spm_id_from=pageDriver&vd_source=cbc0749e76163b49038f7685048fc4dd)

```js
const http = require('http')
//url模块
const url = require('url')
const server = http.createServer((req,res)=>{
  let res01 = url.parse(req.url,true)
  let pathname = res01.pathname
  let keyword = res01.query.keyword
  let body = ''
  //绑定data事件
  req.on('data',chunk=>{
    body += chunk
  })
  //绑定end事件
  req.on('end',()=>{
    console.log(body)
    res.end('hello,http')
  })
})
```















### 模块化

### 包管理工具





