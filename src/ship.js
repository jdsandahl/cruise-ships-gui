class Ship {
  constructor(startingPort) {
    this.currentPort = startingPort;
    this.previousPort = null;
  }

  setSail() {
    this.previousPort = this.currentPort;
    this.currentPort = !this.currentPort;
  }

  dock(newPort) {
    this.currentPort = newPort;
  }
}

module.exports = Ship;
