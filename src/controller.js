(function exportController() {
  function Controller(ship) {
    this.ship = ship;

    this.initialiseSea();
    this.refreshHUD();
    document.querySelector("#sailbutton").addEventListener("click", () => {
      this.setSail();
    });
  }

  Controller.prototype = {
    initialiseSea() {
      const backgrounds = ["./images/water0.png", "./images/water1.png"];

      let backgroundIndex = 0;

      window.setInterval(() => {
        //console.log("test-intervals");
        document.querySelector("#viewport").style.backgroundImage = `url('${
          backgrounds[backgroundIndex % backgrounds.length]
        }')`;
        backgroundIndex += 1;
      }, 1000);
    },

    renderPorts(ports) {
      const portsElement = document.querySelector("#ports");
      portsElement.style.width = "0px";

      ports.forEach((port, index) => {
        const newPortElement = document.createElement("div");
        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;
        newPortElement.className = "port";

        portsElement.appendChild(newPortElement);

        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
      });
    },

    renderShip() {
      const ship = this.ship;

      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(
        `[data-port-index='${shipPortIndex}']`
      );

      const shipElement = document.querySelector("#ship");
      shipElement.style.top = `${portElement.offsetTop + 20}px`;
      shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    },

    setSail() {
      const ship = this.ship;

      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const nextPortElement = document.querySelector(
        `[data-port-index='${nextPortIndex}']`
      );

      if (!nextPortElement) {
        return this.renderMessage(
          `${ship.currentPort.name} is the last stop, time to get off!`
        );
      }

      this.renderMessage(`Now departing ${ship.currentPort.name}`);
      ship.setSail();

      const shipElement = document.querySelector("#ship");
      const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);
        if (shipLeft === nextPortElement.offsetLeft - 32) {
          ship.dock();
          this.renderMessage(`Now arriving at ${ship.currentPort.name}`);
          this.refreshHUD();
          clearInterval(sailInterval);
        }
        shipElement.style.left = `${shipLeft + 1}px`;
      }, 20);
    },

    renderMessage(message) {
      const messageElement = document.createElement("div");
      messageElement.id = "message";
      messageElement.innerHTML = message;

      const viewport = document.querySelector("#viewport");
      viewport.appendChild(messageElement);

      setTimeout(() => {
        viewport.removeChild(messageElement);
      }, 2000);
    },

    refreshHUD() {
      const ship = this.ship;

      const currentPortElement = document.getElementById("current-port");
      currentPortElement.textContent = `Current Port: ${ship.currentPort.name}`;

      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;

      const nextPortElement = document.getElementById("next-port");

      const nextPortName = ship.itinerary.ports[nextPortIndex]
        ? ship.itinerary.ports[nextPortIndex].name
        : "End of Travel";

      nextPortElement.textContent = `Next Port: ${nextPortName}`;
    },

    addPort(itinerary) {
      const newForm = document.getElementById("form");

      const submitClicked = document.getElementById("submitPortBtn");

      submitClicked.addEventListener("click", () => {
        const newPortName = document.getElementById("name").value;
        const portToAdd = new Port(newPortName);

        if (newPortName === "") {
          alert("You must name the Port to be added!");
          return false;
        } else {
          itinerary.ports.push(portToAdd);
          newForm.submit();
        }
      });
    },
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
})();
