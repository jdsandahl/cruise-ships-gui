const { Itinerary } = require("../src/index");

let itinerary;

beforeEach(() => {
  itinerary = new Itinerary(["London", "New York"]);
});

describe("Itinerary", () => {
  it("creates an object instance", () => {
    expect(itinerary).toBeInstanceOf(Object);
  });

  it("has a list of ports", () => {
    expect(itinerary.ports).toBeInstanceOf(Array);
    expect(itinerary.ports).toEqual(["London", "New York"]);
  });
});
