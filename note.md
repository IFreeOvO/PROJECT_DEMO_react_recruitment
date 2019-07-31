## 笔记
##优化点
1.
```
// 推荐写法, 绑定放在构造函数里进行
<button onClick={this.handleClick}></button>

// 该方法每次渲染会bind绑定一次
<button onClick={this.handleClick.bind(this)}></button>

// 每次渲染都会创建一个新函数
<button onClick={() => this.handleClick()}></button>
```

2.
```
// 每次执行会创建一个新对象, 所以不推荐
<div style={{color: 'red'}}></div>
```

3.
```
// 不推荐, 会传递不必要的数据
<div {{...this.state}}></div>
```


4.
父组件改变会导致子组件重新渲染(即使子组件没变化), 解决方案是用下面生命周期进行特殊处理
```
 // 方法一:
 // 判断是否要渲染组件
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.name === this.props.name) {
      return false // 不渲染
    }
    return true
  }

  // 方法二
  // 如果组件无任何状态，则使用纯组件, 继承PureComponent即可
  class Demo extends React.PureComponent {

  }
```
5.react建议,只做浅层比较。例如对比两个对象是否相等,如果属性层级太深会出现性能问题,而且react可能会检测不到数据变化。
> 使用`immutable-js`库(`seamless-immutable`库相当于是它的简化版)可以创建不可变的数据结构,修改原来的数据结构会返回一个新的数据,所以能够很容易比较两个复杂结构的差异
> immutable优点
> 1. 减少内存使用
> 2. 并发安全(不用担心数据被别人意外修改,比如我创建的对象被别人修改了,我可以通过比较两者相等可以知道是否被人修改了)
> 3. 降级项目复杂度
> 4. 便于比较复杂数据, 定制shouldComponentUpdate方便
> 5. 时间旅行功能方便(因为它每次修改会生成新的数据)
> 6. 函数式编程

6.使用`reselect`库优化redux,这个库帮助我们缓存数据计算的结果，例如第一次算出`2+2=4`后,下次可以直接拿到4,有点类似于记忆函数