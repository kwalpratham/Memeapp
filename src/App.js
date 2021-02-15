import React from 'react';
//import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//import MemeList from './MemeList';
import { Card} from 'react-bootstrap';
import axios from 'axios';
import './App.css';
class App extends React.Component {
  state = {
    name: '',
    url: '',
    caption: '',
    memes : []
  };

  componentDidMount=()=>{
    this.getMeme();
  }

  getMeme = ()=>{
    axios.get('/memes/https://xmeme-pratham.herokuapp.com/')
    .then(({data})=>{
      //const data = response.data;
      const rev = new Array(100);
      for(let i = data.length-1;i>=0;i--){
        rev.push(data[i]);
      }
      //this.state.memes = response.memes;
      this.setState({ memes : rev });
      console.log('Data recieved successfully');
    })
    .catch(()=>{
      alert('error occured');
    })
  };

  handlechange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };
  submit = (event) => {
    event.preventDefault();
    const payload = {
      name:this.state.name,
      url:this.state.url,
      caption:this.state.caption
    };
    axios({
      url:'/meme/https://xmeme-pratham.herokuapp.com/',
      method:'POST',
      data: payload
    }).then(() => {
      console.log('Data sent sucessfully!!!');
      this.resetuserinput();
      this.getMeme();
    })
    .catch(() => {
      console.log('error occured');
    });;
  };
  resetuserinput = ()=>{
    this.setState({
      name:'',
      url:'',
      caption:''
    });
  };
  displaymeme = (memes) =>{
    if(!memes.length) return memes;
    return memes.map((meme , index)=> (
      <div key = {index} className="display">
        <Card border="primary" style={{width : '10rem'}}>
          
          <Card.Body>
            <Card.Text><b>{meme.name}</b></Card.Text>
            <Card.Img variant="bottom" src= {meme.url}/>
            <Card.Title><em>{meme.caption}</em></Card.Title>
          </Card.Body>
        </Card>
        <br/>
      </div>
    ));
  };
  

  render(){
    console.log('state: ',this.state);
    return(
      <div>
        <div id="mains">
        <nav><h2>XMeme</h2></nav>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input type="text" name="name"value={this.state.name} onChange={this.handlechange} placeholder="name" />
          </div>
          <div className="form-input">
            <input type="text" name="url" value={this.state.url} onChange={this.handlechange} placeholder="url"/>
          </div>
          <div className="form-input">
            <input type="text" name="caption" value={this.state.caption} onChange={this.handlechange} placeholder="caption"/>
          </div>
          <button>submit</button>
        </form>
        </div>
        <div className="MemePost">
          {this.displaymeme(this.state.memes)}
        </div>
      </div>
      
    );
  }
}
export default App;