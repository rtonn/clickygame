import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import pic from "./pic.json";
import Footer from "./components/Footer";


//Setup Component & State.........................

class App extends Component {
  state = {
    pic,
    clickedPic: [],
    score: 0
  };

//Setup click event................................
  imageClick = event => {
    const currentPic = event.target.alt;
    const picAlreadyClicked =
      this.state.clickedPic.indexOf(currentPic) > -1;

    //if already picked - reset & reorder
    if (picAlreadyClicked) {
      this.setState({
        pic: this.state.pic.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedPic: [],
        score: 0
      });
        alert("You lose. Play again?");

    //if available - score increase & reorder
    } else {
      this.setState(
        {
          pic: this.state.pic.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedPic: this.state.clickedPic.concat(
            currentPic
          ),
          score: this.state.score + 1
        },
    //if get all - congrats & reset game        
        () => {
          if (this.state.score === 12) {
            alert("You Win!");
            this.setState({
              pic: this.state.pic.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedPic: [],
              score: 0
            });
          }
        }
      );
    }
  };



//Setup to render page................................
render() {
  return (
    <div>
      <Navbar 
        score={this.state.score}
      />
      <Jumbotron   score={this.state.score}/>
    
      <div className="wrapper">     
        {this.state.pic.map(pic => (
          <FriendCard
            imageClick={this.imageClick}
            id={pic.id}
            key={pic.id}
            image={pic.image}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
}
export default App;
