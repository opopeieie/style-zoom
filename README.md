# style-zoom
不用transform scale,不用zoom,可以直接修改样式文件中的数值对UI进行倍数缩放.

# Installation
将tool.js放入需要修改的项目文件下。
node tool.js css .1
缩小与放大什么文件可以通过修改tool.js实现

# Examples
文件夹结构:
```
project
│  
│
└───css
│   │   a.css
│   │   b.css
│   │
│   └───lib
│       │   t1.css
│       │   t2.css
│       │   ...
│   
└───views
    │   template1.html
    │   template1.js
```

```javascript 
  node tool.js css 0.1 //将css文件中的所有样式大小缩小0.1倍 
  node tool.js views 2 //将views文件中的所有html文件放大2倍
```
