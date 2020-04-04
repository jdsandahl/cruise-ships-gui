const { Ship } = require("../src/index");
const { Port } = require("../src/index");
const { Itinerary } = require("../src/index");

describe("Ship", () => {
  describe("with ports and an itinerary", () => {
    let ship;
    let itinerary;

    beforeEach(() => {
      const portMethods = {
        removeShip: jest.fn(),
        addShip: jest.fn(),
      };

      port = {
        ...portMethods,
        name: "New York",
        ships: []
      };

      nextPort = {
        ...portMethods,
        name: "London",
        ships: []
      };

      itinerary = new Itinerary([port, nextPort]);
      ship = new Ship("The Baracuda", itinerary);
    });

    it("creates an object instances", () => {
      expect(ship).toBeInstanceOf(Object);
    });

    it("has a name", () => {
      expect(ship.name).toBe("The Baracuda");
    });

    it("creates an object instances with a port", () => {
      expect(ship.currentPort).toBe(port);
    });

    it("gets added to port on instantiation", () => {
      expect(port.addShip).toHaveBeenCalledWith(ship);
    });

    it("can set sail, currentPort becomes the new previousPort and then currentPort becomes falsy", () => {
      ship.setSail();

      expect(ship.currentPort).toBeFalsy();
      expect(ship.previousPort).toBe(port);
      expect(port.removeShip).toHaveBeenCalledWith(ship);
    });

    it("can dock at a new Port", () => {
      ship.setSail();
      ship.dock();

      expect(ship.currentPort).toBe(nextPort);
      expect(nextPort.addShip).toHaveBeenCalledWith(ship);
    });

    it("has a previous port which is null to start", () => {
      expect(ship.previousPort).toBe(null);
    });

    it("can't sail further than its itinerary", () => {
      ship.setSail();
      ship.dock();

      expect(() => ship.setSail()).toThrowError(
        "Last stop on the itinerary reached"
      );
    });
  });
});
