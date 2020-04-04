const { Port } = require("../src/index");

describe("Port", () => {
  describe("with a port name", () => {
    let port;
    const blackPerl = jest.fn();
    const oldDutch = jest.fn();

    beforeEach(() => {
      port = new Port("New York");
    });

    it("has a name property", () => {
      expect(port.name).toBe("New York");
    });

    it("has a ships property", () => {
      expect(port.ships).toEqual([]);
    });

    it("can add a ship to the Port", () => {
      port.addShip(blackPerl);

      expect(port.ships).toEqual([blackPerl]);
    });

    it("can remove a ship from the Port", () => {
      port.ships = [blackPerl, oldDutch];

      port.removeShip(oldDutch);

      expect(port.ships).toEqual([blackPerl]);
    });

    it("can't remove ships that aren't at the Port", () => {
      port.ships = [blackPerl, oldDutch];

      port.removeShip(oldDutch);

      expect(() => port.removeShip(oldDutch)).toThrowError(
        "Can't remove, this ship isn't docked at the Port!"
      );
    });
  });

  describe("without a name provided", () => {
    it("has a default name", () => {
      let port = new Port();

      expect(port.name).not.toEqual(null);
    });
  });
});
