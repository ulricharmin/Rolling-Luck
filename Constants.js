import { Dimensions } from 'react-native';

export default Constants = {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  XR: Dimensions.get("screen").width / 667,
  YR: Dimensions.get("screen").height / 667,
  REELS: 5,
  REEL_MARGIN: 2,
  SYMBOLS: 3,
  REELS_REPEAT: 10,
  REEL_SYMBOLS: [
    "C7WLO7BCMDWOPOLBCGMPMDLG",
    "7MGCWMGO7DDBCCPOPLBOLMWL",
    "CBGBWOMCLLP7MW7OCGPDLOMD",
    "WBBLWOPG7OMMOC7LPCMCDLDG",
    "CC7MWPOGBCLMBWGPLLOMO7DD",
  ],
  BETS: [5, 10, 20, 40, 50, 100, 200, 500, 1000],
  LINES: [
    [
      [0,0], [1,0], [2,0], [3,0], [4,0] // top line
    ],
    [
      [0,1], [1,1], [2,1], [3,1], [4,1] // middle line
    ],
    [
      [0,2], [1,2], [2,2], [3,2], [4,2] // bottom line
    ],
    [
      [0,0], [1,1], [2,2], [3,1], [4,0] // V shape starting from top left
    ],
    [
      [0,2], [1,1], [2,0], [3,1], [4,2] //  V shape starting from bottom left
    ],
    [
      [0,0], [1,2], [2,0], [3,2], [4,0] // W shape starting from top left
    ],
    [
      [0,2], [1,0], [2,2], [3,0], [4,2] // M shape starting from bottom left
    ],
    [
      [0,1], [1,0], [2,1], [3,0], [4,1] // M shape on top half
    ],
    [
      [0,0], [1,1], [2,0], [3,1], [4,0] // W shape on top half
    ],
    [
      [0,1], [1,2], [2,1], [3,2], [4,1] // W shape on bottom half
    ],
    [
      [0,2], [1,1], [2,2], [3,1], [4,2] // M shape on bottom half
    ],
    [
      [0,0], [1,1], [2,1], [3,1], [4,0] // U shape on top half
    ],
    [
      [0,1], [1,2], [2,2], [3,2], [4,1] // U shape on bottom half
    ],
    [
      [0,2], [1,1], [2,1], [3,1], [4,2] // inverse U shape on bottom half
    ],
    [
      [0,1], [1,0], [2,0], [3,0], [4,1] // inverse U shape on top half
    ],
    [
      [0,0], [1,0], [2,1], [3,2], [4,2] // Z shape from top left
    ],
    [
      [0,2], [1,2], [2,1], [3,0], [4,0] // Z shape from bottom left
    ]
  ]
}
