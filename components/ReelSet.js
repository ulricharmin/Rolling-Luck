import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from '../Constants';
import Reel from './Reel';

import { connect } from 'react-redux';
import { updateCoins } from '../redux/reducers/coins';

export default class ReelSet extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null
    }
    this.reels = [];
    this.reelsInMotion = null;
    this.spinResults = [];
    this.winningLines = [];
    this.scatterIdx = [];
  }

  randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  highlightWinningLines = (currentIndex) => {
    if (!this.winningLines.length) {
      return;
    }

    if (currentIndex > 0){
      // turn off the light on the previous line
      Constants.LINES[this.winningLines[currentIndex - 1]].map((el) => {
        this.reels[el[0]].highlightAtIndex(el[1], false);
      });
    }
    if (currentIndex > this.winningLines.length - 1) {
      return;
    }

    Constants.LINES[this.winningLines[currentIndex]].map((el) => {
      this.reels[el[0]].highlightAtIndex(el[1], true);
      this.reels[el[0]].shakeAtIndex(el[1]);
    });

    setTimeout(() => {
      this.highlightWinningLines(currentIndex + 1);
    }, 800);

  }

  highlightScatter = () => {
     
  }

  countScatter = () => {
    let scatter = 0;
    for(let lineIdx=0; lineIdx < 3; lineIdx++) {
      for (let coordIdx=0; coordIdx < 5; coordIdx++) {
        let coords = Constants.LINES[lineIdx][coordIdx];
        let symbolAtCoords = this.spinResults[coords[0]] [coords[1]];
        

          if (symbolAtCoords === "W") {
            scatter += 1;
          }
      }
    }
    console.log('Scatter Count: ' , scatter);
    return scatter;
  }

  evaluateResults = () => {
    let scatterCount = this.countScatter();
    this.winningLines = [];
    var streaksArray = [["T",1], ["J",1], ["Q",1], ["K",1], ["A",1], ["D",1], ["H",1], ["S",1], ["C",1], ["W",1]];
    var streakFactor = [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];
    
    for(let lineIdx=0; lineIdx < Constants.LINES.length; lineIdx++) {
      let currentKind = null;
      var streakHashMap = new Map(streaksArray);

      for (let coordIdx=0; coordIdx < Constants.LINES[lineIdx].length; coordIdx++) {
        let coords = Constants.LINES[lineIdx][coordIdx];
        let symbolAtCoords = this.spinResults[coords[0]] [coords[1]];

        if (coordIdx === 0) {
          currentKind = symbolAtCoords;
        } else {
          if (symbolAtCoords !== currentKind) {
            break;
          } if (symbolAtCoords === currentKind) {
            streakHashMap.set(currentKind, streakHashMap.get(currentKind)+1);
          }
        }
      }

      for(let i=0; i<streaksArray.length; i++) {
        if(streakHashMap.get(streaksArray[i][0]) >= 3) {
          this.winningLines.push(lineIdx);
          /* this.setState({ coins: this.state.bet * streakFactor[i] }) */
          break;
        }
      }
  }

  if (scatterCount >= 3) {
    console.log("Scatter");
    alert("Scatter");
  }
    
  console.log(this.winningLines);
  this.highlightWinningLines(0);
  }

  spin = () => {
    this.reelsInMotion = Constants.REELS;
    for(let i=0; i<Constants.REELS; i++){
      this.reels[i].scrollByOffset(this.randomBetween(
        (Constants.REELS_REPEAT - 6) * this.reels[i].symbols.length,
        (Constants.REELS_REPEAT - 5) * this.reels[i].symbols.length,
      ), (reelIdx, results) => {
        this.reelsInMotion -= 1;
        this.spinResults[reelIdx] = results;

        if (this.reelsInMotion === 0){
          this.evaluateResults();
          this.props.onReady();
        }
      });
    }
  }

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    })
  }



  renderReels = () => {
    let reelWidth = this.state.width / Constants.REELS;
    let reelList = Array.apply(null, Array(Constants.REELS)).map((el, idx) => {
      return <Reel width={reelWidth} height={this.state.height} key={idx} index={idx} ref={(ref) => { this.reels[idx] = ref}} />
    });

    return (
      <>
        {reelList}
      </>
    )
  }

  render() {
    return (
      <View style={styles.reelSet} onLayout={this.onLayout}>
        {this.state.width && this.state.height && this.renderReels()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  reelSet: {
    flex: 1,
    flexDirection: 'row'
  },
});