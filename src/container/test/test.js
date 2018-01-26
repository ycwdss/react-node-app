import React, {Component,PureComponent} from 'react'
/*
* 测试学习内容
* */
//1、生命周期

class Test extends Component{
    constructor(props){
        super(props)
        this.state={
            num:0,
            title:'测试demo'
        }
        this.handleAdd1=this.handleAdd1.bind(this)
        this.handleDemo=this.handleDemo.bind(this)
        console.log('完成数据初始化工作')
    }
    componentWillMount(){
        console.log('组件加载之前1')
    }
    componentDidMount(){
        console.log('组件加载完成！')
    }

    handleAdd1(){
        this.setState({
            num:this.state.num+1
        })
    }
    handleAdd2(){
        this.setState({
            num:this.state.num+1
        })
    }
    handleAdd3(){
        this.setState({
            num:this.state.num+1
        })
    }
    handleDemo(){
        this.setState((prevState,props)=>({
            title:prevState.title+'9'
        }))
    }
    render(){
        console.log('render渲染')
        return (
            <div>
                <p>{this.state.num}</p>
                <button onClick={this.handleAdd1}>btn1</button>
                <button onClick={this.handleAdd2.bind(this)}>btn2</button>
                <button onClick={()=>this.handleAdd3()}>btn3</button>
                <button onClick={this.handleDemo}>按钮</button>
                <Demo title={this.state.title}/>
            </div>
        )
    }
}
class Demo extends PureComponent{
    constructor(props){
        super(props)
        console.log(this.props)
    }

    render(){
        console.log('demo渲染了')
        return(
            <h1>{this.props.title}</h1>
        )
    }
}
export default Test