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

- 定义
  - 可以让数据在组件树中直接传递，而不需要一级一级手动传递
  - 类似于全局变量的做法会使组件失去独立性，复用困难，应做到具体组件具体分析
- 结构
  - `Context` = `<Provider>`生产者 + `<Consumer>`消费者（任意层级）
- API
  - `createContext(defaultValue?)`
  - Consumer 向上找不到 Provider 时，则会显示参数 defaultValue，通常用于单元测试

> `UseContext.js`

#### 2.2 静态属性 ContextType 访问跨层级组件的数据

- 在只有一个 context 的组件中，使用 ContextType 比使用<Consumer>简单的多
- 只能承载一个 context 值，只适用于类组件
- 但是<Provider>的提供必不可少

> `UseContextType.js`

#### 2.3 Lazy 与 Suspense 实现延迟加载

- 背景：暂时没有使用的资源=>延迟加载
- 途径

  - webpack：code splitting 人为拆分
  - import: 动态导入返回一个 promise `import('./detail.js').then(...)`

- Lazy 异步导入组件，lazy 返回一个组件
- Suspense 与 lazy 配合，传入参数为待加载状态时显示，需为组件实例`<Loading />` or `JSX`
- ErrorBoundary 捕获任何（同步以及异步）组件加载错误
  - componentDidCatch 或者 static getDerivedStateFromError

> `UseLazy.js`

#### 2.4 Memo 实现指定组件进行渲染

- 数据未变，不需重新渲染
- shouldComponentUpdate 判断是否需要重新渲染，返回布尔值

```js
class Foo extends Component {
  // nextProps以及nextState为即将渲染的新状态
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.name === this.props.name) {
      return false;
    }
    return true;
  }
  render() {
    console.log("Foo render");
    return null;
  }
}
```

- PureComponent：只能判断传入属性第一级的对比，属性内部发生变化无法判断，会造成数据变更不渲染，但是这是针对 class 组件继承的

  - 父组件传入 bind 函数，生成新函数，会造成每次重新渲染，可以写成类属性传入

- Memo：包裹无状态组件

> `Usememo.js`

### 3. React-Hooks

#### 3.1 Hooks 的概念与意义

- 以往：class 组件，无状态组件用函数
- Hooks let you use state and other React features without writting class
- 类组件不足
  - 状态逻辑复用难
    - 缺少复用机制
    - 渲染属性和高阶组件导致层级冗余
  - 趋向复杂难以维护
    - 生命周期函数混杂不相干逻辑
    - 相干逻辑分散在不同生命周期
  - this 指向困扰
    - 内联函数过度创建新句柄
    - 类成员函数不能保证 this
- Hooks 优势
  - 函数组件无 this 问题
  - 自定义 Hook 方便复用状态逻辑
  - 副作用的关注点分离

#### 3.2 使用 State Hooks

- 原理上是利用全局唯一性，按照固定次序推断的
- useState 是用来替代类组件中 state 和 setState 的新的状态解决方案
- 每次都要求稳定的次序，稳定的数量调用
  - 配置检查规则
  - npm i eslint-plugin-react-hooks -D
  - yarn add eslint-plugin-react-hooks --dev
  ```js
  "eslintConfig": {
    "extends": "react-app",
    "plugins": [
      "react-hooks"
    ],
    "rules": {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  },
  ```
- useState 可以传入一个函数，延迟初始化，提高效率
  ```js
  const [count, setCount] = useState(() => {
    return props.defaultCount || 0;
  });
  ```

> `HooksuseState.js`

#### 3.3 使用 Effect Hooks

- 副作用：一些行为是在组件渲染过程之外的，如绑定事件，网络请求，访问 DOM，调用时机一般是 Mount（componentDidMount）之后，Update（componentDidUpdate）之后，Unmount（componentWillUnmount）之前
- useEffect 可以覆盖上述场景，每次渲染都运行

> `HooksuseEffect.js`

#### 3.4 使用 Context Hooks

- 解决类组件静态成员 contextType 不能使用，且只能承载一个值的问题
- 依然会破坏组件的独立性

> `HooksuseContext.js`

#### 3.5 使用 Memo&Callback Hooks

#### 3.6 使用 Ref Hooks

#### 3.7 自定义 Hooks

#### 3.8 Hooks 的使用法则

#### 3.9 Hooks 的常见问题
