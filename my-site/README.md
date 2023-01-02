# my-site

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 解决error:0308010C:digital envelope routines::unsupported错误
1.在package.json文件中 scripts serve 添加 set NODE_OPTIONS=--openssl-legacy-provider
2.nodeJs版本降到17以下
