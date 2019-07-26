import React, {Component} from 'react'
import {Card,Form,Input,Icon,Cascader,Upload,Button} from 'antd'
import LinkButton from '../../components/link-button';
import {reqCategories} from '../../api'
import PicturesWall from './pictures-wall'
/* Product的添加和更新的子路由组件 */

const {Item} = Form
const {TextArea} = Input

const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      isLeaf: false,
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      isLeaf: false,
    },
    {
        value: 'jiangsu2',
        label: 'Jiangsu',
        isLeaf: true,
      },
  ];

class ProductAddUpdate extends Component{

    state = {
        options:[]
    }

    initOptions = async (categories) => {
        //根据categories生成options数组
        
        const options = categories.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false, //不是叶子
        }))
        //如果是一个二级分类商品的更新
        const {isUpdate,product} = this
        const {pCategoryId,categoryId} = product
        if(isUpdate && pCategoryId!=='0') {
            //获取对应的二级分类列表
            const subCategories = await this.getCategory(pCategoryId)
            //生成二级下拉列表的options
            const childOptions = subCategories.map(c=>({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))

            //找到当前商品对应的一级option对象
            const targetOption = options.find(option => option.value === pCategoryId)

            //关联对应的一级option上
            targetOption.children = childOptions
        }

        
        //更新options状态
        this.setState({
            options: options
        })
    }

    /* 获取一级/二级分类列表，并显示 
    async函数的返回值是一个新的promise对象，promise的结果和值和async函数决定
    */
    getCategory = async (parentId) => {
        const result = await reqCategories(parentId) //{status:0,data:categories}
        // debugger
        if (result.status===0){
            const categories = result.data
            //如果是一级分类列表
            if(parentId==='0') {
                this.initOptions(categories)
            }else { //二级列表
                return categories //返回二级列表 ==> 当前async函数返回的promise就会成功且value为categories
            }
            
        }
    }

    loadData = async selectedOptions => {
        //得到选择的option对象
        const targetOption = selectedOptions[0];
        //显示loading
        targetOption.loading = true;

        //根据选中的分类，请求获取二级分类列表
        const subCategories = await this.getCategory(targetOption.value)
        // 隐藏loading
        targetOption.loading = false
        
        if (subCategories && subCategories.length>0) {
            //生成一个二级列表的options
            const childOptions = subCategories.map(c=>({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))
            //关联到当前option上
            targetOption.children = childOptions

        } else { //当前选中的分类没有二级分类
            targetOption.isLeaf = true
        }

        //更新options状态
        this.setState({
            options: [...this.state.options],//...扩展运算符是解构之后重新赋值，生成一个新的数组，直接复制就是让新的数组指针指向当前数组，当修改新的数组数据时，也会影响到原来的数组(不要直接把this.state.options赋值给options)
        });
    
      };
    
    /* 验证价格的自定义验证函数 */
    validatePrice = (rule,value,callback) => {
        // console.log(value, typeof value)
        if(value*1 > 0){
            callback()//验证通过
        }else{
            callback('价格必须大于0') //验证没通过
        }
        
    }

    submit = () =>{
        //进行表单验证，如果通过了，才发送请求
        this.props.form.validateFields((error,values)=>{
            if(!error){
                alert('发送ajax请求')
            }
        })
    }

    componentDidMount(){
        this.getCategory('0')//发送parentId===‘0’的请求，相当于调用了initOptions这个函数，在initOptions中先set一级列表，再去判断当前页面是否是修改页以及当前product是否有二级标签，获取到之后，[pCategoryId,categoryId]就可以显示出对应的值
    }

    componentWillMount(){
        //取出携带的state
        const product = this.props.location.state //如果是添加，没值。否则有值
        //保存是否是更新的标识（boolean）
        this.isUpdate = !!product //!!强制将product转换boolean类型
        //保存商品（如果没有，保存是{},return中用到product.name等直接取值，可不用判断添加或者是更新）
        this.product = product || {}
    }

    render(){

        const {isUpdate,product} = this
        const {pCategoryId,categoryId} = product
       
        //用来接受级联分类ID的数组
        const categoryIds = []
        if(isUpdate) {
            //商品是一个一级分类的商品
            if(pCategoryId==='0') {
                categoryIds.push(categoryId)
            }else{
                //商品是一个二级分类的商品
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }

            
            
        }


        //指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 2 }, //左侧label的宽度
            wrapperCol: { span: 8 },//指定右侧包裹的宽度
          };

        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{fontSize:20}}></Icon>
                </LinkButton>
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )

        const {getFieldDecorator} = this.props.form

        return(
            <div>
                <Card title={title}>
                    <Form {...formItemLayout}>
                        <Item label='商品名称：'>
                            {
                                getFieldDecorator('name',{
                                    initialValue:product.name,//直接取值，可不用判断添加或者是更新
                                    rules:[
                                        {required:true,message:'必须输入商品名称'}
                                    ]
                                })(<Input placeholder='商品名称'/>)
                            }
                            
                            
                        </Item>
                        <Item label='商品描述：'>
                        {
                                getFieldDecorator('desc',{
                                    initialValue:product.desc,
                                    rules:[
                                        {required:true,message:'必须输入商品描述'}
                                    ]
                                })(<TextArea placeholder="请输入商品描述" autosize={{ minRows: 2, maxRows: 6 }} />)
                        }
                                
                        </Item>
                        <Item label='商品价格：'>
                        {
                                getFieldDecorator('price',{
                                    initialValue:product.price,
                                    rules:[
                                        {required:true,message:'必须输入商品描述'},
                                        {validator: this.validatePrice}
                                    ]
                                })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)
                        }
                            
                        </Item>
                        <Item label='商品分类：'>
                        {
                                getFieldDecorator('categoryIds',{
                                    initialValue:categoryIds,
                                    rules:[
                                        {required:true,message:'必须指定商品分类'},
                                        
                                    ]
                                })(<Cascader
                                    placeholder='请指定商品分类'
                                    options={this.state.options} /* 需要显示的列表数据 */
                                    loadData={this.loadData} /* 当选择某个列表项，加载下一级列表的监听回调 */
                                    
                                />)
                        }
                            
                        </Item>
                        <Item label='商品图片：'>
                            <PicturesWall />
                        </Item>
                        <Item label='商品详情：'>
                            <div>商品分类</div>
                        </Item>
                        <Item >
                            <Button type='primary' onClick={this.submit}>提交</Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(ProductAddUpdate)