const { Itinerary } = require("../src/index");
const { Port } = require("../src/index");

describe("Itinerary", () => {
  describe("with a list of ports", () => {
    let itinerary;
    let portOne, portTwo;

    beforeEach(() => {
      portOne = new Port("London");
      portTwo = new Port("New York");

      itinerary = new Itinerary([portOne, portTwo]);
    });

    it("creates an object instance", () => {
      expect(itinerary).toBeInstanceOf(Object);
    });

    it("has a list of ports", () => {
      expect(itinerary.ports).toBeInstanceOf(Array);
      expect(itinerary.ports).toEqual([portOne, portTwo]);
    });
  });
});
