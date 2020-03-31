class Ship {
  constructor(currentPort) {
    this.currentPort = currentPort;
  }

  setSail() {
    this.currentPort = !this.currentPort;
  };
}

module.exports = Ship;
