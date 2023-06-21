class FischerChessGeneration {
  static assignBishops(lineup) {
    const darkBishop = Math.floor(Math.random() * 4) * 2;
    const lightBishop = (Math.floor(Math.random() * 4) * 2) + 1;

    lineup[darkBishop] = 'B';
    lineup[lightBishop] = 'B';
  }

  static assignQueen(lineup) {
    const potentialLocation = Math.floor(Math.random() * 8);

    if (lineup[potentialLocation] !== undefined) {
      this.assignQueen(lineup);
    } else {
      lineup[potentialLocation] = 'Q';
    }
  }

  static assignKnight(lineup) {
    const potentialLocation = Math.floor(Math.random() * 8);

    if (lineup[potentialLocation] !== undefined) {
      this.assignKnight(lineup);
    } else {
      lineup[potentialLocation] = 'N';
    }
  }

  static assignRooksAndKing(lineup) {
    const pieces = ['R', 'K', 'R'];

    let j = 0;

    for (let i = 0; i < 8; i++) {
      if (lineup[i] === undefined) {
        lineup[i] = pieces[j];
        j++;
      }
    }
  }

  static generateLineup() {
    const lineup = new Array(8);
    this.assignBishops(lineup);
    this.assignQueen(lineup);
    this.assignKnight(lineup);
    this.assignKnight(lineup);
    this.assignRooksAndKing(lineup);
    return lineup;
  }
}

module.exports = FischerChessGeneration;
