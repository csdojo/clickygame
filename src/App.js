import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import Title from "./components/Title";
import friends from "./friends.json";
import './App.css';
import { underline } from "ansi-colors";

class App extends Component {
  constructor(props) {
    super(props);



  }
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

   
    console.log(this.state.unselectedFriends);
    console.log(findFriend);


    if (findFriend === undefined) {

      // what you pick is not in the unselectedFriend array, game ends.
      //  console.log(findFriend)
      this.setState({
        message: "You guessed incorrectly!",
        topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
        curScore: 0,
        friends: friends,
        unselectedFriends: friends
      });

    }
    else {
      // what you pick is in the unseletedFriday array, game continues.
      const newFriends = this.state.friends.filter(item => item.name !== name);

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
        <Title />
        <div className="container bodyC">


          {
            this.state.friends.map(friend => (
              <FriendCard key={friend.id}
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
