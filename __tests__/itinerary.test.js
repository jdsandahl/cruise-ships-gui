const { Itinerary } = require("../src/index");

describe("Itinerary", () => {
  describe("with a list of ports", () => {
    let itinerary;
    const portOne = jest.fn();
    const portTwo = jest.fn();

    beforeEach(() => {
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
