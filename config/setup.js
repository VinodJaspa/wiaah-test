import "regenerator-runtime/runtime";
const enzyme = require("enzyme");
// Fail to use this adapter with react 17
//const Adapter = require('enzyme-adapter-react-16');
//Using an Unofficial Adapter
const Adapter = require("@wojtekmaj/enzyme-adapter-react-17");
enzyme.configure({ adapter: new Adapter() });
