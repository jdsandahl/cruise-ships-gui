const Port = require("../src/port");

describe("Port", () => {
    it("has a name property", () => {
        port = new Port ("New York");

        expect(port.name).toBe("New York");
    });
});