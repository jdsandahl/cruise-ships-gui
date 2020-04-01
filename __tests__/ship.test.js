const Ship = require("../src/ship");
const Port = require("../src/port");

let ship;
let port;

beforeEach(() => {
  port = new Port("New York");
  ship = new Ship(port);
});

describe("Ship", () => {
  it("creates and object instances", () => {
    expect(ship).toBeInstanceOf(Object);
  });

  it("creates and object instances", () => {
    expect(ship.currentPort).toBe(port);
  });

  it("can set sail", () => {
    ship.setSail();

    expect(ship.currentPort).toBeFalsy();
  });

  it("can dock at a port after setting sail", () => {
    const newPort = new Port("London");

    ship.setSail();

    ship.dock(newPort);

    expect(ship.currentPort).toBe(newPort);
  });
});
