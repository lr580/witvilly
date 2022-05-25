简介：微信小程序参赛作品。帮助乡村干部管理村民数据的工具。

该文档可视为开发手册。

具体功能需求分析见 `需求文档.md`

[toc]



## 数据建模

### 数据字典

引用数据字典的条目用下划线标记。

| 条目     | 类型   | 描述                                     |
| -------- | ------ | ---------------------------------------- |
| ID       | string | 微信API获取的 `openID`                   |
| 性别     | string | `男`,`女`,`未知`(或空)                   |
| 日期     | number | 定义见`变量和函数定义-common-dateCalc`   |
| 用户类别 | number | 0未知,1村民,2基层干部,3高层干部          |
| 头像路径 | string | 以 `/avatar/` 为相对路径，格式 `xxx.xxx` |
| stamp    | number | 时间毫秒的时间戳                         |
| rich     | string | HTML格式富文本                           |

> 备注：关于性别：(懒得用下标对应了，反正也不缺这点内存) 



#### 文件字典

云开发 ID：`cloud1-4gfwdpzcf1fa51e4` 

头像文件夹：`avatar` 

富文本图片文件夹：`rich`



图片的统一文件名：当前时间戳，即 <u>stamp</u> = `(new Date()).getTime()` ，若同时上传多张，每次自增 1。

> 实践依据：不可能有两个用户在 9 毫秒同时上传 9 张图片。所以可以认为零冲突。不使用 md5 加密，是因为时间戳排序方便按时间查询。



### 对象定义

#### 干部

cadre

- `_openid` <u>ID</u> 主键
- `registerDate` <u>日期</u> 注册日期
- `avatar` <u>头像路径</u>
- `name` string 真名
- `sex` <u>性别</u> 
- `birthday` <u>日期</u> 出生日期 
- `userType` <u>用户类别</u>
- `prifile` string 个人介绍
- `phone` string 手机号
- `address` string 工作地址



#### 群众

people

- `_openid` <u>ID</u>
- `name` string 真名
- `avatar` <u>头像路径</u> 
- `birthday` <u>日期</u> 出生日期 
- `income` string 收入描述
- `jobs` array(string) 职业



#### 备忘录

memo

- `id` <u>stamp</u> 
- `text` 





## 代码文件结构



## 变量和函数定义

按照文件层次描述了可供调用的 (public) 函数的基本信息。

在 `js` 目录内，所有通用性高(即放到别的程序也能用的代码)的内容将在子目录 `common` 内；专用性(即只在本程序较为适用)的内容放在其他子目录内。

### common

#### md5

标准 md5 非对称加密库。[参考](https://www.cnblogs.com/kiko2014551511/p/11610943.html)

- `md5(string)` 将字符串加密，返回长 32 的字符串代表加密结果

#### dateCalc

时间、日期计算专用。

考虑到在数据库存储的处理不便，考虑到本程序的需求，此处规定日期存储统统用 `yyyymmddhhmmss` 格式整数，命名为 `strDate` 或简写为 `str`。若 `hhmmss` 全 `0` ，可简写为 `yyyymmdd`。若任意信息未知，缺省填全 $0$。并提供如下函数：

> [参考-format方法增加](https://wenku.baidu.com/view/9d645cfc6c1aff00bed5b9f3f90f76c661374ccc.html)

- `Date2Str(src)` , `src` 是 Date ，返回  `yyyymmddhhmmss` 格式整数
- `Str2Date(src)` , `src` 是 `strDate` ，返回 Date 。



#### upload

上传文件、图片等专用。

- 



## 细节备注

