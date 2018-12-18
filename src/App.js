import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import friends from "./friends.json";
import './App.css';

class App extends Component {

  state = {
    friends,
    message: "Click an image to begin!",
    topScore: 0,
    curScore: 0,
    friends: friends,
    unselectedFriends: friends
  };

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  selectFriend = name => {
    const findFriend = this.state.unselectedFriends.find(item => item.name === name);

    if (findFriend === undefined) {
      // failure to select a new friend
      this.setState({
        message: "You guessed incorrectly!",
        topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
        curScore: 0,
        friends: friends,
        unselectedFriends: friends
      });
    }
    else {
      // success to select a new friend
      const newFriends = this.state.unselectedFriends.filter(item => item.name !== name);

      this.setState({
        message: "You guessed correctly!",
        curScore: this.state.curScore + 1,
        friends: friends,
        unselectedFriends: newFriends
      });
    }

    this.shuffleArray(friends);
  };


  render() {
    return (
      <div className="App">

        <Nav
          message={this.state.message}
          curScore={this.state.curScore}
          topScore={this.state.topScore}
        />
        <div className="box">
          <div className="container">
            <div className="jumbotron jumbotron-fluid brother">


            </div>
          </div>
          <div className="content">
            <div className="desp">
              <h1 className="display-4 ">Clicky Game</h1>
              <p className="lead ">Click on image to earn points, but don't click on any more than once!</p>
            </div>
          </div>
        </div>
        <div className="container bodyC">


          {
            this.state.friends.map(friend => (
              <FriendCard
                name={friend.name}
                image={friend.image}
                selectFriend={this.selectFriend}
                curScore={this.state.curScore}
              />
            ))
          }

        </div>
        <div className="footer">
          <p>Footer</p>
        </div>
      </div>



    );
  }
}

export default App;
