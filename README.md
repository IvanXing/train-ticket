- react-scripts -> node_modules/bin & scripts

- 用 eject 解构编译脚本

  - 将 react-scripts 中逻辑代码释放到根目录，从而允许自行修改
  - 给封装简洁性做减法，给灵活性做加法
  - npm run eject
  - git status 查看修改，增加了 config 和 scripts 目录，修改了 package.json 文件
  - eject 不可逆

  ```js
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
  ```

```

```
