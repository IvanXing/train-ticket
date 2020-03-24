### 1. 项目搭建

- 1.1 react-scripts -> node_modules/bin & scripts

- 1.2 用 eject 解构编译脚本，从而可以灵活配置

  - 将 react-scripts 中逻辑代码释放到根目录，从而允许自行修改
  - 给封装简洁性做减法，给灵活性做加法
  - npm run eject（执行后不可逆）
  - git status 查看修改，增加了 config 和 scripts 目录，修改了 package.json 文件

  ```js
    new file: config/env.js
    new file: config/getHttpsConfig.js
    new file: config/jest/cssTransform.js
    new file: config/jest/fileTransform.js
    new file: config/modules.js
    new file: config/paths.js
    new file: config/pnpTs.js
    new file: config/webpack.config.js
    new file: config/webpackDevServer.config.js
    new file: scripts/build.js
    new file: scripts/start.js
    new file: scripts/test.js
    modified: package.json
    modified: yarn.lock
  ```

  ```js
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    }
    // ==>
    "scripts": {
      "start": "node scripts/start.js",
      "build": "node scripts/build.js",
      "test": "node scripts/test.js"
    },
  ```

### 2. React 一些新特性

#### 2.1 Context 实现跨层级的组件数据传递

#### 2.2 静态属性 ContextType 访问跨层级组件的数据

#### 2.3 Lazy 与 Suspense 实现延迟加载

#### 2.4 Memo 实现指定组件进行渲染
