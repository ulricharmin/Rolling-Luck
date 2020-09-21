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
    for(let lineIdx=0; lineIdx < Constants.LINES.length; lineIdx++) {
    let tstreak = 0;
    let jstreak = 0;
    let qstreak = 0;
    let kstreak = 0;
    let astreak = 0;
    let dstreak = 0;
    let hstreak = 0;
    let sstreak = 0;
    let cstreak = 0;
    let wstreak = 0;
    let currentKind = null;
    for (let coordIdx=0; coordIdx < Constants.LINES[lineIdx].length; coordIdx++) {
      let coords = Constants.LINES[lineIdx][coordIdx];
      let symbolAtCoords = this.spinResults[coords[0]] [coords[1]];


        if (coordIdx === 0) {
          currentKind = symbolAtCoords;
          tstreak = 1;
          jstreak = 1;
          qstreak = 1;
          kstreak = 1;
          astreak = 1;
          dstreak = 1;
          hstreak = 1;
          sstreak = 1;
          cstreak = 1;
          wstreak = 1;
        } else {
          if (symbolAtCoords !== currentKind) {
            break;
          } else if (symbolAtCoords === currentKind && currentKind === "T") {
            tstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "J") {
            jstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "Q") {
            qstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "K") {
            kstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "A") {
            astreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "D") {
            dstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "H") {
            hstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "S") {
            sstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "C") {
            cstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "W") {
            wstreak += 1;
          }

        }
      }
    
    if (tstreak >= 3) {
      alert("Ten")
      this.winningLines.push(lineIdx);
    }
    else if (jstreak >= 3) {
      alert("J")
      this.winningLines.push(lineIdx);
    }
    else if (qstreak >= 3) {
      alert("Q")
      this.winningLines.push(lineIdx);
    }
    else if (kstreak >= 3) {
      alert("K")
      this.winningLines.push(lineIdx);
    }
    else if (astreak >= 3) {
      alert("A")
      this.winningLines.push(lineIdx);
    }
    else if (dstreak >= 3) {
      alert("Diamond")
      this.winningLines.push(lineIdx);
    }
    else if (hstreak >= 3) {
      alert("Heart")
      this.winningLines.push(lineIdx);
    }
    else if (sstreak >= 3) {
      alert("Spades")
      this.winningLines.push(lineIdx);
    }
    else if (cstreak >= 3) {
      alert("Club")
      this.winningLines.push(lineIdx);
    } else if (wstreak >= 3) {
      alert("ScatterStreak")
      this.winningLines.push(lineIdx);
    }
  }

     if (scatterCount >= 3) {
        alert("scutter")
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
