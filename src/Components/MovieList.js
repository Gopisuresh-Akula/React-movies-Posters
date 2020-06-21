import React from "react";
import { Card, Icon,Button } from "antd";
import { Row, Col } from "react-flexbox-grid";
const MovieList = ({ games, toggleStar,editGame,deleteGame }) => {
  return (
    <div>
      <Row>
        {games.length === 0 ? (
          <h2>sasasa</h2>
        ) : (
          games.map((game, i) => (
            <Col  key={game._id} xs={12} xl={3}>
              <Card
              key={game._id} 
                style={{ width: 300, margin: 20 }}
                cover={
                  <img
                    src={game.imageUrl}
                    alt="Logo"
                    style={{ width: 300, height: 250 }}
                  />
                }
              >
                <Icon
                  onClick={() => toggleStar(game._id)}
                  type="star"
                  style={{
                    float: "right",
                    fontSize: 25,
                    color: game.featured ? "#1E77EB" : "unset",
                  }}
                />
                <h2>{game.Name}</h2>
                <strong>{game.Duration}</strong><br/><br/>
                <div style={{display:'flex'}}>
        
                <Button onClick={()=>editGame(game)}     style={{width:"50%",paddingRight:10}}><Icon type="edit" /></Button>&nbsp;
               
                <Button onClick={()=>deleteGame(game)}  style={{width:"50%"}}><Icon type="delete" />   </Button>
               
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};
export default MovieList;
