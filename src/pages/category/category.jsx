import React, {Component} from 'react'
import {Card,Table,Button,Icon, message,Modal} from 'antd'
import LinkButton from '../../components/link-button';
import {reqCategories,reqUpdateCategory,reqAddCategory} from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'

/* 二级路由的品类管理 */
export default class Category extends Component{
    state = {
        loading:false,//是否正在获取表格数据
        categories:[],//一级分类列表
        subCategories:[],//二级分类列表，分两个列表，这样在回退回一级列表的时候不必再发送请求
        parentId:'0', //当前需要显示的分类列表的parentId，一开始获取一级分类列表请求
        parentName:'',//当前需要显示的分类列表的父分类名称
        showStatus:0,//标识添加、更新的确认框是否显示，0:都不显示，1:显示添加，2：显示更新

    }

    dataSource = [
            {
                "parentId": "0",
                "_id": "5c2ed631f352726338607046",
                "name": "家电",
                "__v": 0
            },
            {
                "parentId": "0",
                "_id": "5c2ed631f352726338607047",
                "name": "服装",
                "__v": 0
            },
            {
                "parentId": "0",
                "_id": "5c2ed631f352726338607048",
                "name": "食品",
                "__v": 0
            },
            {
                "parentId": "0",
                "_id": "5c2ed631f352726338607049",
                "name": "玩具",
                "__v": 0
            }
          ];

    /* 初始化table所有列的数组 */
    initColumns(){
        this.columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',//对应dataSource中的“name”属性名
              key: 'name',
            },
            {
                title: '操作',
                width: 300 || '300px',
                //每一行都有自己的render
                render:(category) => ( // 返回需要显示的界面标签
                    <span>{/* 需要有根标签 */}
                        <LinkButton onClick={() => {this.showUpdate(category)}}>修改分类</LinkButton>
                        {/* <LinkButton onClick={this.showSubCategories(category)}>查看子分类</LinkButton> 不能这样写因为不仅是click的时候才会调，初始化渲染的时候就会调了?*/}
                        {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategories(category)}>查看子分类</LinkButton> :null}
                    </span>
                )
            }
          ];    
    }
    /* 异步获取一级/二级分类列表显示 */
    //parentId:如果没有指定根据状态中的parentId请求，如果指定了根据指定的请求
    getCategories = async (parentId) =>{
        //发请求前，显示loading
        this.setState({loading:true})
        parentId = parentId || this.state.parentId
        //发异步ajax请求，获取数据
        const result = await reqCategories(parentId)
        //在请求完成后，隐藏loading
        this.setState({loading:false})
        if(result.status===0){
            //取出分类数组（可能是一级的也可能是二级的）
            const categories = result.data
            if(parentId==='0'){
                //更新一级分类状态
                this.setState({
                    categories//名字相同可简写 categories:categories
                })
            }else{
                //更新一级分类状态
                this.setState({
                    subCategories:categories
                })
            }
            
        }else{
            message.error('获取分类列表失败')
        }
    }
    /* 显示指定一级分类对象的二级列表 */
    showSubCategories = (category) => {
        //更新状态
        this.setState({
            parentId:category._id,
            parentName:category.name
        },()=>{ // 在状态更新且重新render（）后执行
            console.log('parentId',this.state.parentId)
            //获取二级分类列表
            this.getCategories()
        })
        //setState()不能立即获取最新的状态：因为setState（）是异步更新状态的
        
    }

    /* 显示指定一级分类列表 */
    showCategories =() =>{
        //更新为显示一级列表的状态
        this.setState({
            parentId:'0',
            parentName:'',
            subCategories:[]
        })//不需要再this.getCatogories()，因为之前已经获取过一级列表的目录
    }

    /* 响应点击取消：隐藏确定框 */
    handleCancel =() =>{
        //清除输入数据
        this.form.resetFields()
        this.setState({
            showStatus:0
        })
    }

    /* 添加分类 */
    addCategory =  () =>{
        this.form.validateFields(async (err,values)=>{
            if(!err){
                //隐藏确认框
                this.setState({
                    showStatus:0
                })
                //收集数据并提交添加分类的请求
                const {parentId,categoryName} = values/* this.form.getFieldsValue() */
                //清除输入数据
                this.form.resetFields()
                
                const result = await reqAddCategory(categoryName,parentId)
                if(result.status===0){
                    //重新获取分类列表显示
                    if(parentId === this.state.parentId){//添加的分类就是当前分类，需要重新获取列表
                        this.getCategories()
                    }else if(parentId === '0'){//在二级分类列表下添加一级分类
                        //重新获取一级分类列表，但不需要显示一级分类列表
                        this.getCategories('0')//传入parentId=‘0’，会获取新的一级列表但是犹豫状态中state.parentId没有变，所以不会显示一级列表
                    }
                    
                }
            }
            
            
        })
        
    }
    showAdd =() =>{
        this.setState({
            showStatus:1
        })
    }
    /* 更新分类 */
    updateCategory =  () =>{

        //进行表单验证，只有通过才处理
        this.form.validateFields(async (err,values)=>{//values：所有表单数据的对象
            if(!err){
                //隐藏确定框
                this.setState({
                    showStatus: 0
                })
                //准备数据
                const categoryId = this.category._id
                const {categoryName} =values /* this.form.getFieldValue('categoryName') */
                //清除输入数据
                this.form.resetFields()
                //发请求更新分类
                const result = await reqUpdateCategory({categoryId,categoryName})
                if (result.status===0){
                    //重新显示列表
                    this.getCategories()
                }
            }
        })
        
        

    }
    showUpdate =(category) =>{
        //保存分类对象，没必要放到状态里面去
        this.category = category
        //更新状态
        this.setState({
            showStatus:2
        })
    }

    //为第一次render准备数据
    componentWillMount(){
        this.initColumns();
    }

    //执行异步任务：发送异步ajax请求
    componentDidMount(){
        this.getCategories()
    }
    render(){
        const {loading, categories,subCategories,parentId,parentName,showStatus} = this.state
        //读取指定的分类
        const category =this.category||{} //如果还没有值指定一个空对象
        
        //card的左侧标题
        const title = parentId === '0' ? '一级分类列表':(
            <span>
                <LinkButton onClick={()=>{this.showCategories(category)}}>一级分类列表</LinkButton>
                <Icon type='arrow-right' style={{marginRight:'10px'}}></Icon>
                <span>{parentName}</span>
            </span>
        )
        //card的右侧标题
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type='plus'/>
                添加
            </Button>
        )
    
        return(
            <Card title={title} extra={extra} style={{ width: '100%' }}>
                <Table 
                    bordered 
                    rowKey='_id' 
                    loading={loading}
                    dataSource={parentId==='0' ? categories : subCategories} 
                    columns={this.columns} 
                    pagination={{defaultPageSize:5,showQuickJumper:true}}
                />
                <Modal
                    title="添加分类"
                    visible={showStatus===1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm 
                        categories={categories} 
                        parentId={parentId} 
                        setForm={(form)=>{this.form = form}}
                    />
                </Modal>

                <Modal
                    title="修改分类"
                    visible={showStatus===2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm 
                        categoryName={category.name || ''} 
                        setForm={(form)=>{this.form = form}}
                    />
                </Modal>
            </Card>/* bordered也可写成bordered={true} */
            
        )
    }
}