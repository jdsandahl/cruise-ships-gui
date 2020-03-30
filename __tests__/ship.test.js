const Ship = require("../src/ship");

describe("Ship", () => {
  it("creates and object instances", () => {
    expect(new Ship()).toBeInstanceOf(Object);
  });

  it("creates and object instances", () => {
    const ship = new Ship("Liverpool");

    expect(ship.startingPort).toBe("Liverpool");
  });
});
