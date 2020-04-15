(function exportShip() {
  class Ship {
    constructor(itinerary, name = "Ghost Ship") {
      this.name = name;
      this.itinerary = itinerary;
      this.currentPort = itinerary.ports[0];
      this.previousPort = null;

      if (this.currentPort !== undefined){
        this.currentPort.addShip(this);
      };
    }

    setSail() {
      const itinerary = this.itinerary;
      const currentPortIndex = itinerary.ports.indexOf(this.currentPort);

      if (currentPortIndex === itinerary.ports.length - 1) {
        throw new Error("Last stop on the itinerary reached");
      }

      this.currentPort.removeShip(this);
      this.previousPort = this.currentPort;
  
      this.currentPort = null;
    }

    dock() {
      const itinerary = this.itinerary;
      const previousPortIndex = itinerary.ports.indexOf(this.previousPort);

      this.currentPort = itinerary.ports[previousPortIndex + 1];
      this.currentPort.addShip(this);
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Ship;
  } else {
    window.Ship = Ship;
  }
})();
