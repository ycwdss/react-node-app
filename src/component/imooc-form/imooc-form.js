import React from 'react'


//高阶组件 返回一个处理过的组件，其他组件使用，自动继承了这些属性和方法
export default function imoocForm(Comp){
    return class WrapperComp extends React.Component{
        constructor(props){
            super(props)
            this.state = {}
            this.handleChange = this.handleChange.bind(this)
        }
        handleChange(key,val){
            console.log(key,val)
            this.setState({
                [key]:val
            })
        }
        render(){
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}