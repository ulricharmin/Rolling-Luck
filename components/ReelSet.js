import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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

  evaluateResults = () => {
    this.winningLines = [];
    for(let lineIdx=0; lineIdx < Constants.LINES.length; lineIdx++) {
      let cstreak = 0;
      let lstreak = 0;
      let gstreak = 0;
      let mstreak = 0;
      let ostreak = 0;
      let pstreak = 0;
      let dstreak = 0;
      let bstreak = 0;
      let sstreak = 0;
      let scatter = 0;
      let currentKind = null;
      for (let coordIdx=0; coordIdx < Constants.LINES[lineIdx].length; coordIdx++) {
        let coords = Constants.LINES[lineIdx][coordIdx];
        let symbolAtCoords = this.spinResults[coords[0]] [coords[1]];


        if (coordIdx === 0) {
          if (symbolAtCoords === "W") {
            scatter = 1;
            break;
          }
          currentKind = symbolAtCoords;
          cstreak = 1;
          lstreak = 1;
          gstreak = 1;
          mstreak = 1;
          ostreak = 1;
          pstreak = 1;
          dstreak = 1;
          bstreak = 1;
          sstreak = 1;
        } else {
          if (symbolAtCoords !== currentKind) {
            break;
          } else if (symbolAtCoords === currentKind && currentKind === "7") {
            sstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "B") {
            bstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "D") {
            dstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "C") {
            cstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "L") {
            lstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "G") {
            gstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "M") {
            mstreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "O") {
            ostreak += 1;
          } else if (symbolAtCoords === currentKind && currentKind === "P") {
            pstreak += 1;
          }

          if (symbolAtCoords !== currentKind && symbolAtCoords === "W") {
            scatter += 1;
          }
        }
      }
      if (cstreak >= 3) {
        alert("Cherry")
        this.winningLines.push(lineIdx);
      }
      else if (lstreak >= 3) {
        alert("Lemon")
        this.winningLines.push(lineIdx);
      }
      else if (gstreak >= 3) {
        alert("Grape")
        this.winningLines.push(lineIdx);
      }
      else if (mstreak >= 3) {
        alert("Melon")
        this.winningLines.push(lineIdx);
      }
      else if (ostreak >= 3) {
        alert("Orange")
        this.winningLines.push(lineIdx);
      }
      else if (pstreak >= 3) {
        alert("Plum")
        this.winningLines.push(lineIdx);
      }
      else if (bstreak >= 3) {
        alert("Bell")
        this.winningLines.push(lineIdx);
      }
      else if (dstreak >= 3) {
        alert("Diamond")
        this.winningLines.push(lineIdx);
      }
      else if (sstreak >= 3) {
        alert("Seven")
        this.winningLines.push(lineIdx);
      }
      if (scatter >= 3) {
        alert("Scatter")
      }
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
      return <Reel width={reelWidth} height={this.state.height} key={idx} index={idx} ref={(ref) => { this.reels[idx] = ref}}/>
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