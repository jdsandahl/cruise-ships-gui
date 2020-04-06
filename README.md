# Cruise Ships
A project that allows the tracking of cruise ships with set itineraries coming in and out of ports.  

## Getting Started
Clone down the git repo to a folder in order to view test of how the program works. 

In order to use the program manually a session will need to be started from the command line using
~~~
Node
~~~

You can then add the following classes in order to begin creating the Ships, Ports and Itineraries to be used. 
~~~
const { Ship } = require("../src/index");
const { Port } = require("../src/index");
const { Itinerary } = require("../src/index");
~~~

Ports can be created and named taking string name as a parameter. Ports also keep track of ships that are currently docked at the port as an array of ships. 
~~~
const exLondon = new Port('London');
const exNewYork = new Port('New York');

exLondon.name; //will return 'London';
exLondon.ships; //will return []; 
~~~

Itineraries can be created from a list of Ports, taken as an arrary of Port objects as a parameter
~~~
const exItinerary = new Itinerary([exLondon, exNewYork]);

exItinerary.ports; //will return [{name: 'London', ships: []},{name: 'New York', ships: []}]
~~~

Ships can be created with an Itinerary as an object parameter and a string name for the ship's name as a parameter
~~~
const exFlyingDutchMan = new Ship(exampleItinerary, "Flying Dutchman"); 
~~~

Ships have methods that can be called on each ship in order to setSail from the current port and to dock at the next port on the ship's itinerary
~~~
exFlyingDutchMan.setSail();

exFlyingDutchMan.dock()
~~~

### Prerequisites

First clone down from repo
~~~
git clone git@github.com:jdsandahl/cruise-ships.git
~~~

Navigate the cloned down folder within the terminal
~~~
cd cruise-ships
~~~

Install dependencies
~~~
npm install
~~~

Install Jest testing package if you'd like to utilize the test files
~~~
npm install -D jest
~~~

To run the current project tests from the command line
~~~
npm test
~~~