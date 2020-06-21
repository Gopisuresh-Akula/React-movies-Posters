import React, { Component } from 'react'
import { Card } from 'antd'
import { Row, Col, } from 'react-flexbox-grid';
import './App.css'
 class App extends Component {
  render() {
    return (
      <div style={{padding:25}}>
        <Row>
          <Col xs={12} lg={4} xl={3}>
        <Card   style={{ width:250,height:"auto", cursor: "pointer",padding:0 }}>
          <img
                                        src={require("./Assets/Jallikattu.jpg")}
                                        alt="Logo"
                                        style={{ width:240,height:250, cursor: "pointer" }}
                                       
                                    />
            hhhh
                                    </Card>
                                    </Col>
                                    </Row>
      </div>
    )
  }
}

export default App
