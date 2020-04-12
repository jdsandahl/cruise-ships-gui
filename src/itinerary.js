(function exportItinerary() {
  class Itinerary {
    constructor(listOfPorts) {
      this.ports = listOfPorts;
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Itinerary;
  } else {
    window.Itinerary = Itinerary;
  }
})();
