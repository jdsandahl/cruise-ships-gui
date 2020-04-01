class Ship {
  constructor(startingPort) {
    this.currentPort = startingPort;
  }

  setSail() {
    this.currentPort = !this.currentPort;
  }

  dock(newPort) {
    this.currentPort = newPort;
  }
}

module.exports = Ship;
