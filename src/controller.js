(function exportController() {
  function Controller(ship) {
    this.ship = ship;
    
    this.initialiseSea();
    this.refreshHUD();

    document.querySelector("#sailbutton").addEventListener("click", () => {
      this.setSail();
    });

    document.querySelector("#addPortButton").addEventListener("click", () => {
      this.addPort();
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

      /*if(ports) {
        //ports.forEach(port => {
          let element = document.getElementsByClassName('port');
          console.log(element);
          element.parentNode.removeChild(element);
        //});
      }*/


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
      if (ship.currentPort){ //truthy falsy check same as !== undefined
      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(
        `[data-port-index='${shipPortIndex}']`
      );

      const shipElement = document.querySelector("#ship");
      shipElement.style.top = `${portElement.offsetTop + 20}px`;
      shipElement.style.left = `${portElement.offsetLeft - 32}px`;
      }
    },

    setSail() {
      const ship = this.ship;

      if (ship.currentPort){
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
    } else {
      return this.renderMessage('A port needs to be added first!');
    }
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

      if (ship.currentPort !== undefined){
        currentPortElement.textContent = `Current Port: ${ship.currentPort.name}`;
      }

      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;

      const nextPortElement = document.getElementById("next-port");

      const nextPortName = ship.itinerary.ports[nextPortIndex]
        ? ship.itinerary.ports[nextPortIndex].name
        : "End of Travel";

      nextPortElement.textContent = `Next Port: ${nextPortName}`;
    },

    addPort() {
      const ship = this.ship;

      const newPortName = document.getElementById("port-name").value;
      console.log(newPortName); //<empty string> || 'testName'
      
      if (newPortName === "") {
        return this.renderMessage("You must name the Port to be added!");
      }

      const portToAdd = new Port(newPortName);
      console.log(portToAdd); //Obeject {name:<testName> , ships: []}
      
      if(!ship.currentPort){
        ship.currentPort = portToAdd;
        portToAdd.ships.push(ship);
      }

      ship.itinerary.ports.push(portToAdd);
      console.log(ship.itinerary); //Object { ports: (2) […] }

      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      console.log(currentPortIndex); // 0

      const additionalPortIndex = ship.itinerary.ports.indexOf(portToAdd); 
      console.log(additionalPortIndex); // 1

      
      /*const portToRender = ship.itinerary.ports.slice(additionalPortIndex);
      console.log(ship.itinerary.ports.length); // 2
      console.log(ship.itinerary); 
      console.log(portToRender);
      /*
      tried using the index to render single ports
      while this did render each next port, 
      the ship wouldn't travel to the next port
      */

      return (
        this.renderPorts(ship.itinerary.ports),
        this.refreshHUD(),
        this.renderShip()
      );
    },
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
})();
