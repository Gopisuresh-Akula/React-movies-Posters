import React, { Component } from "react";
import ReactImageFallback from "react-image-fallback";
import { Form, Input, Button,Checkbox  } from "antd";
import { Row, Col } from "react-flexbox-grid";
import { Select } from "antd";
const { Option } = Select;
const { TextArea } = Input;

const intialdata={
  _id:null,
  Name: "",
  Description: "",
  Duration: "",
  Rate: "",
  budget: "",
  imageUrl:'',
  featured: false,
  Reviewer: "",

}
class Movieform extends Component {
  state = {
    data:intialdata,
   errors:{
     
   }
  };

componentDidMount() {
  if(this.props.game._id){
    this.setState({ data:this.props.game});
  }
  
}

componentWillReceiveProps (nextProps){
  if (nextProps.game._id&&nextProps.game._id!==this.state.data._id){
   this.setState({ data:nextProps.game}); 
  }
  if (!nextProps.game._id)
  {
this.setState({ data:intialdata  });
  }

    }

  validate(data){
    const errors={};
    if(!data.Name) errors.Name="This field can't be blank";
    if(!data.Description) errors.Description="This field can't be blank";
    if(!data.Duration) errors.Duration="This field can't be blank";
    if(!data.Rate) errors.Rate="This field can't be blank";
    if(!data.budget) errors.budget="This field can't be blank";
    if(!data.imageUrl) errors.imageUrl="This field can't be blank";
    if(!data.featured) errors.featured="This field can't be blank";
    if(!data.Reviewer) errors.Reviewer="This field can't be blank";
    
    return errors;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const errors=this.validate(this.state.data)
    this.setState({ errors });


    if(Object.keys(errors).length === 0){
      console.log("this.props",this.props)
      this.props.submit(this.state.data);
    }
  };


  SelectonChange=(value)=>{
    this.setState({data:{...this.state.data,Reviewer:value }});
  }
  onChangeCheckbox = (e) => {
    
    this.setState({data: {...this.state.data,[e.target.name]: e.target.checked} });
  };
  handleStringChange=e=>{

    this.setState({ 
      data: {...this.state.data,[e.target.name]:e.target.value}
    })
  }
  handleNumberchange=(e)=>{
    this.setState({data:{...this.state.data,[e.target.name]:parseInt(e.target.value, 10)}  });
  }
  render() {
const {data, errors}=this.state
    return (
      <div style={{ padding: 25 }}>
        <Form onSubmit={this.handleSubmit}>
        <Row>
        <Col xs={10}>
          <div>
          <div>
          <Input
            name="Name"
            placeholder="Title"
            value={data.Name}
            style={{borderColor:errors.Name ?'red':null}}
            onChange={this.handleStringChange}
          />
         {errors.Name&&
          <p style={{color:'red'}}>{errors.Name}</p>
         }
          </div>
          <br />
          <br />
          <div>
          <TextArea
            name="Description"
            placeholder="Descriptions"
            style={{borderColor:errors.Description ?'red':null}}
            value={data.Description}
            onChange={this.handleStringChange}
          />
            {errors.Description&&
          <p style={{color:'red'}}>{errors.Description}</p>
         }
          </div>
          <br />
          <br />
         <div>
          <Input
            type="Number"
            placeholder="Duration"
            name="Duration"
            style={{borderColor:errors.Duration ?'red':null}}
            value={data.Duration}
            onChange={this.handleNumberchange}
          />
    {errors.Duration&&
          <p style={{color:'red'}}>{errors.Duration}</p>
         }
</div>
          <br /> <br />
          <div>
          <Input
            type="Number"
            name="Rate"
            style={{borderColor:errors.Rate ?'red':null}}
            placeholder="Rating"
            value={data.Rate}
            onChange={this.handleNumberchange}
          />
              {errors.Rate&&
          <p style={{color:'red'}}>{errors.Rate}</p>
         }
          </div>
          <br /> <br />
          <div>
          <Input
            type="Number"
            name="budget"
            style={{borderColor:errors.budget ?'red':null}}
            placeholder="budget"
            value={data.budget}
            onChange={this.handleNumberchange}
          />
              {errors.budget&&
          <p style={{color:'red'}}>{errors.budget}</p>
         }
          </div>
          <br /> <br />
         <div>
          <Input
          type="text"
            id="imageUrl"
            name="imageUrl"
            style={{borderColor:errors.imageUrl ?'red':null}}
            placeholder="imageUrl"
            value={data.imageUrl}
            onChange={this.handleStringChange}
          />
              {errors.imageUrl&&
          <p style={{color:'red'}}>{errors.imageUrl}</p>
         }
          </div>
          <br/> <br/>

          
          <div>
              <Checkbox
                name="featured"
                checked={data.featured}
                onChange={this.onChangeCheckbox}
              >
                featured
              </Checkbox><br /> <br />
              {errors.featured&&
          <p style={{color:'red'}}>{errors.featured}</p>
         }
              </div>
              <br/> <br/>

          <div>
          <Select
            style={{ width: 200,borderColor:errors.Reviewer ?'red':null }}
            name="Reviewer"
            placeholder="Choosen"
             value={data.Reviewer}
            onChange={this.SelectonChange}
          >
            {this.props.Reviewer.map((member) => (
              <Option value={member._id} key={member._id}>
                {member.name}
              </Option>
            ))}
          </Select>
          {errors.Reviewer&&
          <p style={{color:'red'}}>{errors.Reviewer}</p>
         }
          </div>
          <br/><br/>
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <Button type="primary" htmlType="submit">
            submit
          </Button>
          <Button onClick={this.props.FormTogglecancel}     type="primary" htmlType="submit">
            cancel
          </Button>
          </div>
          </div>
          </Col>
          <Col xs={2}> 
              <ReactImageFallback
              src={data.imageUrl}
              style={{width:150,height:150}}
              fallbackImage="http://via.placeholder.com/250x250"
              alt="cool image should be here"
              className="my-image" />
          </Col>
</Row>
        </Form>
      </div>
    );
  }
}
export default Movieform;
