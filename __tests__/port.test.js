const { Port } = require("../src/index");

describe("Port", () => {
  describe("with a port name", () => {
    let port;

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
      port.addShip("Black Perl");

      expect(port.ships).toEqual(["Black Perl"]);
    });

    it("can remove a ship from the Port", () => {
      port.ships = ["Black Perl", "Old Dutch", "The Clipper"];

      port.removeShip("Old Dutch");

      expect(port.ships).toEqual(["Black Perl", "The Clipper"]);
    });
  });
});
