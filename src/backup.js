
class App extends Component {

  state = {
    friends,
    message: "Click an image to begin!",
    topScore: 0,
    curScore: 0,
    friends: friends,
    selectedFriends: []
  };

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  selectFriend = name => {
    const findFriend = this.state.selectedFriends.find(item => item.name === name);

    console.log(this.state.selectedFriends);
    console.log(findFriend);
    

    if (findFriend === undefined) {
      // what you pick is not in the this.state.selectedFriends, game continues
      const newFriends = this.state.friends.filter(item => item.name === name);
      

      this.setState({
        message: "You guessed correctly!",
        curScore: this.state.curScore + 1,
        friends: friends,
        selectedFriends: [...this.state.selectedFriends, ...newFriends]
      });
    }
    else {

       // what you pick is already in the this.state.selectedFriends, game ends because you select the duplicated name
      //  console.log(findFriend)
       this.setState({
         message: "You guessed incorrectly!",
         topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
         curScore: 0,
         friends: friends,
         selectedFriends: []
       });
          
    }

    this.shuffleArray(friends);
    console.log(this.state.message);
  };


  render() {
    return (
      <div className="App">

        <Nav
          message={this.state.message}
          curScore={this.state.curScore}
          topScore={this.state.topScore}
        />
        <Title/>
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
