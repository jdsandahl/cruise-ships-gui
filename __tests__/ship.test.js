const { Ship } = require("../src/index");
const { Port } = require("../src/index");

let ship;
let port;

beforeEach(() => {
  port = new Port("New York");
  ship = new Ship(port);
});

describe("Ship", () => {
  it("creates an object instances", () => {
    expect(ship).toBeInstanceOf(Object);
  });

  it("creates an object instances with a port", () => {
    expect(ship.currentPort).toBe(port);
  });

  it("can set sail", () => {
    ship.setSail();

    expect(ship.currentPort).toBeFalsy();
  });

  it("can dock at a new Port", () => {
    const newPort = new Port("London");

    ship.dock(newPort);

    expect(ship.currentPort).toBe(newPort);
  });

  it("has a previous port which is null to start", () => {
    expect(ship.previousPort).toBe(null);
  });

  it("after setting sail, the currentPort becomes the previousPort", () => {
    let leavingPort = ship.currentPort;
    ship.setSail();

    expect(ship.previousPort).toBe(leavingPort);
  });
});
