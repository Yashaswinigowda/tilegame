import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

const style = {
  margin: 12,
};

const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
class App extends Component {
  constructor(props) {
  super(props)
  this.state={
    selected: [],
    start: 0,
    end: 0,
    starttile: null,
    endtile: null,
  }
  this.onSelectTile = this.onSelectTile.bind(this);
}

  onSelectTile(index){
    if(this.state.start){
        this.setState({
        starttile: index,
        start: 0,
        // console.log('starttile',starttile);
      });
    }
    else if (this.state.end) {
        this.setState({
        endtile: index,
        end: 0,
      })

    }else{
        this.setState((prevState)=>{
        // var newselected = [];
        var newState= Object.assign({},prevState);
        newState.selected=[...prevState.selected,index];
        return newState;
      });
    }
  }

  render() {
    console.log("state",this.state)
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <RaisedButton label="Start" primary={true} style={style}
            onClick={()=>{
            this.setState((prevState)=>{
              return {start:1};
            });
          }} />
          <RaisedButton label="End" primary={true} style={style}
            onClick={()=>{
              this.setState((prevState)=>{
                return {end:1};
              });
            }}
          />
        </MuiThemeProvider>
        <div className="wrapper">
          { array.map((value, key) => (<Tile start={this.state.start} end={this.state.end} starttile={this.state.starttile} endtile={this.state.endtile} index={value} onSelectTile = { this.onSelectTile } key={key} {...this.state}/>))}
       </div>
      </div>
    );
  }
}

class Tile extends Component{

  constructor(props){
    super(props);
    this.styles=['#444','#ccc'];
    this.state={
      index:0,
    };
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.starttile !== this.props.starttile ){
  //     if(nextProps.starttile === this.props.index){
  //       this.setState({value:`Start-${this.props.index}` });
  //     }
  //   }
  //   else if(nextProps.endtile !== this.props.endtile ){
  //       debugger;
  //       if(nextProps.endtile === this.props.index){
  //       this.setState({value:`End-${this.props.index}`});
  //     }
  //   }
  // }
  
  render(){
    let index = this.state.index;
    let color = this.styles[index];
    console.log(this.props.starttile , this.props.index );
    return(

      <div className="box"
        style={{'backgroundColor':color}}
        onClick={()=>{
        this.props.onSelectTile(this.props.index)
        this.setState((prevState)=>{
          return {index:Number(!prevState.index)};
        });
      }} >
        {this.props.index}
        {this.props.starttile === this.props.index ? `Start` : null }
        {this.props.endtile === this.props.index ? `End`: null }
      </div>
    );
  }

}


export default App;
