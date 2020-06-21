import React, { Component,lazy, Suspense } from 'react';
import { Layout, Menu, Icon, } from 'antd';
import { Row, Col } from "react-flexbox-grid";
import _orderBy from  "lodash/orderBy"
// import GameList from './GameList'
// import Gameform from './Gameform';
//import Listado from './Listado';
const MovieList = lazy(() => import('./MovieList'));
const Movieform = lazy(() => import('./Movieform'));
const { Header } = Layout;
const games=
[
    {
        _id:1,
        "Name":"Jigarthanda",
       "imageUrl": "https://ik.imagekit.io/i8wrodkqzr/jigarthanda1_PIdYou0Zl.jpg",
       "Duration":"2h 51m",
       "featured":true
      },
      {
        _id:2,
        "Name": "Thithi",
       "imageUrl": "https://ik.imagekit.io/i8wrodkqzr/Tithi_UT7MRU-giO.jpg",
       "Duration":"2h 3m",
       "featured":false
      },
      {
        _id:3,
        "Name": "Super Deluxe",
       "imageUrl": "https://ik.imagekit.io/i8wrodkqzr/SuperDeleuxe_NEszo3XYg.jpg",
       "Duration":"2h 56m",
       "featured":false
      },
      {
        _id:4,
        "Name": "Pariyerum Perumal",
       "imageUrl": "https://ik.imagekit.io/i8wrodkqzr/Pariyerum-1_rrH41tVD-.jpg",
       "Duration":"2h 34m",
       "featured":false
      },
      {
        _id:5,
        "Name": "Cat Sticks",
       "imageUrl": "https://ik.imagekit.io/i8wrodkqzr/CatSticks_O5nP66Mt1.jpg",
       "Duration":"1h 34m",
       "featured":false
      },
      {
        _id:6,
        "Name": "Andhadhun",
       "imageUrl": "https://ik.imagekit.io/i8wrodkqzr/AndhaDhun_LYHHBmTRG.jpg",
       "Duration":"2h 30m",
       "featured":true
      },
      {
        _id:7,
        "Name": "The Pick-up Artist",
       "imageUrl": "https://ik.imagekit.io/i8wrodkqzr/ThePickupArtist_JqjeRYcepP.jpg",
       "Duration":"1h 21m",
       "featured":false
      } ,
         {
          _id:8,
        "Name": "Care of Kancharapalem",
       "imageUrl": "https://ik.imagekit.io/i8wrodkqzr/co_gskABDVN-.jpg",
       "Duration":"2h 32m",
       "featured":true
      },
      {
        _id:9,
        "Name": "Premam",
       "imageUrl": "https://ik.imagekit.io/i8wrodkqzr/premam_TClGpcE5so.jpg",
       "Duration":"2h 44m",
       "featured":true
      }
]
const Reviewer=[
  {_id:1,name:'Rajeev Masand'},
  {_id:2,name:'Baradwaj Rangan'},
  {_id:3,name:'Anupama Chopra'}
]
class App extends Component {
state={
  games:[],
  form:false,
  selectMovie:{},
  Numberofcols:12
}
FormToggle=()=>{
  this.setState({  form:true, Numberofcols:6,selectMovie:{}  });
}
FormTogglecancel=()=>{
  this.setState({  form:false,Numberofcols:12,selectMovie:{}  });
}
componentDidMount() {
  this.setState({ games:this.SortGames(games)});
    }


SortGames(games){
  return _orderBy(games,["featured", "Name"],["desc","asc"]) ;
}
addMovie=(Movie)=>{

  this.setState({ 
    games:this.SortGames([ 
    ...this.state.games,
    {
            ...Movie,
            _id:this.state.games.length + 1
    }
    ]),
    form:false
  });
}

SaveMovie =(Movie)=>(Movie._id ?this.updateMovie(Movie):this.addMovie(Movie));


updateMovie=(Movie)=>{
this.setState({
   games:this.SortGames([ this.state.games.map(item=>item._id===Movie._id ? Movie:item) ]),
   form:false
    });
    
}
deleteMoviefromthelist=(Movie)=>{
this.setState({ games:this.state.games.filter(item=>item._id !==Movie._id)  });
}


toggleStar=(gameid)=>{
  const newgames=this.state.games.map((game,i) =>{
    if(game._id ===gameid)
    {
      return {...game,featured:!game.featured }
    }
    return game;
  })
  this.setState({ games:this.SortGames(newgames)  });
}
SelectedMovieForEditing=(game)=>this.setState({ selectMovie:game,form:true,Numberofcols:6   });


    render() {
        return (
            <div style={{overflow:'hidden',}}>
       <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" >
        <Menu.Item key="1" onClick={this.FormToggle} style={{color:'#ffff',marginTop:'15px'}}><Icon type="plus" />AddNewForm</Menu.Item>
      </Menu>
    </Header>
<Row>    
  <Col xl={this.state.Numberofcols}>
{ this.state.form?
<Suspense fallback={<p>Movieform...</p>}>
<Movieform Reviewer={Reviewer}
submit={this.SaveMovie}
game={this.state.selectMovie}
FormTogglecancel={this.FormTogglecancel}
/>  
						</Suspense>
   :null
}

</Col>
<Col xl={this.state.Numberofcols}>
<Suspense fallback={<p>MovieList...</p>}>    
                <MovieList games={this.state.games}
                 toggleStar={this.toggleStar}
                 editGame={this.SelectedMovieForEditing}
                 deleteGame={this.deleteMoviefromthelist}
                />
                	</Suspense>

                  </Col>
               </Row>   

            </div>
        )
    }
}
export default App
