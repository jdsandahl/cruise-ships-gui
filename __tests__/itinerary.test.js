const { Itinerary } = require("../src/index");
const { Port } = require("../src/index");

let itinerary;
let portOne, portTwo;

beforeEach(() => {
    portOne = new Port("London");
    portTwo = new Port("New York");

  itinerary = new Itinerary([portOne, portTwo]);
});

describe("Itinerary", () => {
  it("creates an object instance", () => {
    expect(itinerary).toBeInstanceOf(Object);
  });

  it("has a list of ports", () => {
    expect(itinerary.ports).toBeInstanceOf(Array);
    expect(itinerary.ports).toEqual([portOne, portTwo]);
  });
});
