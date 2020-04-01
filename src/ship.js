class Ship {
  constructor(startingPort) {
    this.currentPort = startingPort.name;
  };

  setSail() {
    this.currentPort = !this.currentPort;
  };

  dock(newPort) {
    this.currentPort = newPort.name;
  }
};

module.exports = Ship;
