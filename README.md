简介：微信小程序参赛作品。帮助乡村干部管理村民数据的工具。

该文档可视为开发手册。

具体功能需求分析见 `需求文档.md`

[toc]



## 数据建模

### 数据字典

#### 数据类型定义

引用数据字典的条目用下划线标记。

| 条目     | 类型   | 描述                                           |
| -------- | ------ | ---------------------------------------------- |
| ID       | string | 微信API获取的 `openID`                         |
| 性别     | string | `男`,`女`,`未知`(或空)                         |
| 日期     | number | 定义见`变量和函数定义-common-dateCalc`         |
| 用户类别 | number | 0未知(未注册),1村民,2基层干部,3高层干部,-1异常 |
| 头像路径 | string | 以 `/avatar/` 为相对路径，格式 `xxx.xxx`       |
| 时间戳   | number | 时间毫秒的时间戳                               |
| 富文本   | string | HTML格式富文本                                 |
| 标签     | string | 互异字符串                                     |
| 重要级   | number | 优先级 [0,10] 默认5 整数，值越大越重要         |
| 微信号   | string | 与真实微信号唯一对应，认为是常量               |
| 分组     | string | 互异字符串                                     |
| 文体     | number | 0未知,1备忘录,2村民备注,4政务公告              |
| 血缘类型 | number | 0未知,1亲->子(非对称),2婚姻(对称)              |

> 备注：
>
> - 关于性别：(懒得用下标对应了，反正也不缺这点内存) 
> - 标签不使用下标对应了，以自己为主键
> - 之所以在时间戳之外还有一个日期(即日期完全可以被时间戳替代)类型，是作备用使用，当前版本未使用日期类型，只使用了时间戳类型
> - 用户类型的十位为 1 时，代表已注册但退出了登录。十位为 2 时，代表账号已删除。
>
> 



#### 文件字典

云开发 ID：`cloud1-4gfwdpzcf1fa51e4` 

头像文件夹：`avatar` 

- 默认头像 `default.jpg`

富文本图片文件夹：`rich`

附件文件夹：`accessory`



图片的统一文件名：当前时间戳，即 <u>时间戳</u> = `(new Date()).getTime()` ，若同时上传多张，每次自增 1。

> 实践依据：不可能有两个用户在 9 毫秒同时上传 9 张图片。所以可以认为零冲突。不使用 md5 加密，是因为时间戳排序方便按时间查询。

附件的统一命名：当前时间戳



### 对象定义

#### 用户

cadre。主要是基层干部

- `_openid` <u>ID</u> 
- `registerDate` <u>时间戳</u> 注册日期 主键
- `avatar` <u>头像路径</u>
- `name` string 真名
- `sex` <u>性别</u> 
- `birthday` <u>时间戳</u> 出生日期 
- `userType` <u>用户类别</u>
- `prifile` string 个人介绍
- `phone` string 手机号
- `address` string 工作地址
- `governs` array(<u>时间戳</u>) 管理的群众
- `memos` array(<u>时间戳</u>) 拥有的备忘录+政务通知
- `plans` array(<u>时间戳</u>) 拥有的计划
- `subordinates` array(<u>时间戳</u>) 下属
- `authorized` bool 是否通过实名认证(现阶段默认true)



#### 群众

people

- `id` <u>时间戳</u> 创建日期 主键
- `_openid` <u>ID</u> 
- `name` string 真名
- `avatar` <u>头像路径</u> 
- `birthday` <u>时间戳</u> 出生日期 
- `income` string 收入描述
- `jobs` array(string) 职业
- `addresses` array(string) 地址
- `contacts` array(string) 联系方式
- `wechat` <u>微信号</u> 
- `groups` array(<u>分组</u>)
- `updateDate` <u>时间戳</u> 最后更新时间



#### 备忘录

memo

- `id` <u>时间戳</u> 创建日期 主键
- `text` <u>富文本</u> 正文
- `title` string 标题
- `tags` array(<u>标签</u>)
- `abstract` string 摘要
- `updateDate` <u>时间戳</u> 最后更新时间
- `importance` <u>重要度</u> 
- `accessoroies` array(<u>时间戳</u>) 附件主键列表，当前版本无用
- `type` <u>文体</u> 
- `relatedPeople` array(<u>时间戳</u>) 外键，关联的群众
- `private` bool 是否不允许上级查看



#### 附件

accessory

当前版本未实现。从属关系由拥有主体单向定义，不作冗余。

- `id`  <u>时间戳</u> 主键
- `name` string 附件显示名
- `desc` string 附件描述，可选



#### 政务通知

broadcast

未来实现。

- `id` <u>时间戳</u> 通知主键 创建日期
- `source` array(<u>时间戳</u>) 广播通知
- `audience` array(<u>微信号</u>) 通知受众(群众或干部)
- `sendDate` <u>时间戳</u> 发送日期
- `sentAudience` array(<u>时间戳</u>) 已成功发出的受众
- `receivedAudience` array(<u>时间戳</u>) 已成功收到的受众
- `desc` string 通知备注



#### 编辑锁

editlock

- `id` <u>时间戳</u> 主键，编辑开始时间
- `memoid` <u>时间戳</u> 外键
- `cadreid` <u>时间戳</u> 外键



#### 计划

plan

- `id` <u>时间戳</u> 创建日期 主键
- `ddl` <u>时间戳</u> 截止日期
- `start` <u>时间戳</u> 开始日期
- `remind` <u>时间戳</u> 提醒日期
- `title` string 计划名
- `detail` <u>富文本</u> 
- `finished` bool
- `importance` <u>重要度</u> 
- `private` bool 是否不允许上级查看



#### 亲属关联

relative

- `id` <u>时间戳</u> 创建日期 主键
- `type` <u>血缘类型</u>
- `lfs` <u>时间戳</u> 拥有该关系的主语群众
- `rfs` <u>时间戳</u> 拥有该关系的谓语群众



## 代码文件结构

待补充



## 变量和函数定义

### 变量

#### 全局变量

##### app.globalData

- `openid` 运行程序自动获取
- `userInfo` 数据库当前用户的 `cadre` 数据



##### app

不存在 `app.globalData` 但存在 `app` 的、可供调用的内容

- `handler` 页面 this 传引用，可以用于操作一个页面，默认是用户页 `user`，在其 `onLoad` 时自动获取



#### global

在云存储 global 集合的 `_id` 为 `'0'` 的数据。

- `forge` 骗审专用，是否开启功能限制模式，审核阶段请 true，否则 false



#### 页面变量

即页面的 data 对象内容

##### user





### 函数

按照文件层次描述了可供调用的 (public) 函数的基本信息。

在 `js` 目录内，所有通用性高(即放到别的程序也能用的代码)的内容将在子目录 `common` 内；专用性(即只在本程序较为适用)的内容放在其他子目录内。

#### common

##### obj

Object 功能拓展。[深复制参考](https://blog.csdn.net/weixin_46074961/article/details/122412958)

- `clone(obj)` 返回深复制结果。

##### md5

标准 md5 非对称加密库。[参考](https://www.cnblogs.com/kiko2014551511/p/11610943.html)

- `md5(string)` 将字符串加密，返回长 32 的字符串代表加密结果

##### dateCalc

时间、日期计算专用。

考虑到在数据库存储的处理不便，考虑到本程序的需求，此处规定日期存储统统用 `yyyymmddhhmmss` 格式整数，命名为 `strDate` 或简写为 `str`。若 `hhmmss` 全 `0` ，可简写为 `yyyymmdd`。若任意信息未知，缺省填全 0。全 0 代表不存在的日期。并提供如下函数：

> [参考-format方法增加](https://wenku.baidu.com/view/9d645cfc6c1aff00bed5b9f3f90f76c661374ccc.html)

- `Date2Str(src)` , `src` 是 Date ，返回  `yyyymmddhhmmss` 格式整数
- `Str2Date(src)` , `src` 是 `strDate` ，返回 Date 。
- `get_ymd(v)` 对 Date 返回 `{yy, mm, dd}`
- `get_ymdhms(v)` 对 Date 返回 `{yy, MM, dd, hh, mm, ss}`
- `print(v, type = 0)` 对 Date / <u>时间戳</u> 返回 `%04d/%02d/%02d` ，若 type = 1，加多 `%02d:%02d:%02d`



##### promisify

异步操作简化库。[参考](http://news.558idc.com/122801.html)

- `promisify(f)` ，传入一个函数，将它强转异步函数。此时在 `async` 里用 `await` 可以接收它的值(注意`try..catch..finally`)，如：

  ```js
  const acloud = promisify(wx.cloud.callFunction);
  try {
      console.log(1);//为了表明是异步而在异步前输出点东西
      const openidPack = await acloud({
          name: 'getopenid'
      });
      const openid = openidPack.result.openid;
      console.log(openid);
  } catch (err) {} finally {}
  ```

- `acloud` 即 `wx.cloud.callFunction` 的异步函数

- `awx` 对象，是被用 `promisify` 打包了的改编 `wx` 异步函数。



##### io

调试和弹窗输出，并提供频繁点击锁。

调试输出可以手动关闭。默认每种输出都有调试输出

- `err(cerr, outmsg = '网络错误，请重试', duration = 1000)` 弹窗报错

- `print(info, icon = 'none', duration = 1000)` 弹窗输出

- `log` / `out` 调试输出，同 `console.log`。可以批量关闭。

- 同理，有 `time` , `timeEnd` , `timeOut` 函数，代替 `console` 的对应函数。

- `helpInput0(handler, key = '', dest = '', funcName = '', obj = 'input')` 

  生成一个 input 的 `bindinput` ，函数名为 `funcName` 默认为 `input_`+key，存储值为 `handler.data.obj.dest`，其 `dest` 默认为 key。每次输入时将输入值放到该变量里，调用 `handler.setData`。其中 `handler` 是页面 page 的传引用 this。若 `handler` 没有这个 `dest` 或 `obj` 自动新定义一个。

- `helpInput0(handler, key = '', dest = '', funcName = '')` 

  生成一个 input 的 `bindinput` ，函数名为 `funcName` 默认为 `input_`+key，存储值为 `handler.data.dest`，其 `dest` 默认为 `i_`+key。每次输入时将输入值放到该变量里，调用 `handler.setData`。其中 `handler` 是页面 page 的传引用 this。若 `handler` 没有这个 `dest` 自动新定义一个。

- `initLock(handler, lockname = '1')` 

  为 page 添加一个防频繁点击锁，锁ID为 `lockname`。之后使用 `checklock_lockname` 来加锁，若之前已经锁了那么就返回 true(可以直接 return)，用 `unlock_lockname` 来解锁。可以在 `handler.data.locks.lockname` 看到这个布尔值变量锁。

- `lockfunc(handler, lockname, func, async = false) ` 

  在上文的基础上，绑定一个锁函数 `func` ，函数名为 `lockname` ，执行该函数体。目前暂时只有无参函数，如果想要有参用 `initLock`。



##### upload

上传文件、图片等专用。

- 



#### base

##### userCtrl

用户普遍登录注册注销等功能实现。

- `getUser()` 获取当前用户 `cadre` 信息，若不存在则创建，返回信息。

- `update(infos)` 将更新当前用户的信息同时作用于云存储和本地。

- `refresh(handler, key = 'userInfo', decor = true)` 

  对 page 页面的 data 的 key 值更新当前用户数据，若 `decor`，那么将数据更新为显示格式。



##### cadreCtrl







### 云函数

在根目录(`miniprogram`外)的`project.config.json`里的`cloudfunctionRoot`点明了云函数的定义位置(在本地定义的)，对着打开这个位置，右击新建`node.js`可以新建一个函数，天然会返回`openid`。所以用`wx.cloud.callFunction`跑它就行。

目前定义的函数有：

- `getopenid` ，传入任意，返回带`openid`，对回调返回体用`.result.openid`拾取





## 细节备注

### 冷知识

特殊字符在 `wxml` 的渲染：[参考](http://t.zoukankan.com/lguow-p-10118347.html)  ，在 `text` 加 `decode="true"`
