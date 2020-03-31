const Ship = require("../src/ship");

let ship;

beforeEach(() => {
  ship = new Ship("Liverpool");
});

describe("Ship", () => {
  it("creates and object instances", () => {
    expect(ship).toBeInstanceOf(Object);
  });

  it("creates and object instances", () => {
    expect(ship.currentPort).toBe("Liverpool");
  });
});

describe("setSail", () => {
  it("can set sail", () => {
    ship.setSail();

    expect(ship.currentPort).toBeFalsy();
  });
});