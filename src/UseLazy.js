import React, { Component, lazy, Suspense } from "react";
import "./App.css";

const About = lazy(() => import(/*webpackChunkName: 'about'*/ "./About.js"));
// webpack增加注释，重命名about组件的network加载名字about.chunk.js
// about.chunk.js 设置 Block Request URL
// 捕获后台组件渲染错误：ErrorBoundary 错误边界 利用一个生命周期 componentDidCatch

class UseLazy extends Component {
  //类成员语法
  state = {
    hasError: false
  };
  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }
  // 发生错误，把返回结果合并到state中
  // static getDerivedStateFromError() {
  //   return {
  //     hasError: true
  //   };
  // }
  render() {
    if (this.state.hasError) {
      return <div>error</div>;
    }
    return (
      <div>
        <div>==========demo: lazy and Suspense==========</div>
        <Suspense fallback={<div>loading</div>}>
          <About></About>
        </Suspense>
      </div>
    );
  }
}

export default UseLazy;
