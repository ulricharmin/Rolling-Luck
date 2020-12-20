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
    "HTJTQSQWTDAKCHKHQTJDAJJD",
    "SKJJKCJJSDJKWQTHJATHQJJA",
    "AHQAKKKKJTCDKTWJQAKKTWQD",
    "TCHHJDWHTJAASQQAHKCTKSHK",
    "JQWSQTTDTJQHTKSHSCTAHQSJ",
  ],
  BETS: [5, 10, 20, 40, 50, 100, 200, 500, 1000],
  LINES: [
    [
      [0,0], [1,0], [2,0], [3,0], [4,0] // top line [1]
    ],
    [
      [0,1], [1,1], [2,1], [3,1], [4,1] // middle line [2]
    ],
    [
      [0,2], [1,2], [2,2], [3,2], [4,2] // bottom line [3]
    ],
    [
      [0,0], [1,1], [2,2], [3,1], [4,0] // V shape starting from top left [4]
    ],
    [
      [0,2], [1,1], [2,0], [3,1], [4,2] //  V shape starting from bottom left [5]
    ],
    [
      [0,0], [1,2], [2,0], [3,2], [4,0] // W shape starting from top left [6]
    ],
    [
      [0,2], [1,0], [2,2], [3,0], [4,2] // M shape starting from bottom left [7]
    ],
    [
      [0,1], [1,0], [2,1], [3,0], [4,1] // M shape on top half [8]
    ],
    [
      [0,0], [1,1], [2,0], [3,1], [4,0] // W shape on top half [9]
    ],
    [
      [0,1], [1,2], [2,1], [3,2], [4,1] // W shape on bottom half [10] 
    ],
    [
      [0,2], [1,1], [2,2], [3,1], [4,2] // M shape on bottom half [11]
    ],
    [
      [0,0], [1,1], [2,1], [3,1], [4,0] // U shape on top half [12]
    ],
    [
      [0,1], [1,2], [2,2], [3,2], [4,1] // U shape on bottom half [13]
    ],
    [
      [0,2], [1,1], [2,1], [3,1], [4,2] // inverse U shape on bottom half [14]
    ],
    [
      [0,1], [1,0], [2,0], [3,0], [4,1] // inverse U shape on top half [15]
    ],
    [
      [0,0], [1,0], [2,1], [3,2], [4,2] // Z shape from top left [16]
    ],
    [
      [0,2], [1,2], [2,1], [3,0], [4,0] // Z shape from bottom left [17]
    ]
  ]
}
