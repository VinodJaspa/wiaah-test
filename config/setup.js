const enzyme = require("enzyme");
// Fail to use this adapter with react 17
//const Adapter = require('enzyme-adapter-react-16');
//Using an Unofficial Adapter
Adapter = require("@wojtekmaj/enzyme-adapter-react-17");
enzyme.configure({ adapter: new Adapter() });

const randomNum = (max) => Math.floor(Math.random() * max);
jest.mock("utils", () => ({
  ...jest.requireActual("utils"),
  randomNum,
  randomNumWithNegative: (max) => {
    const ranNum = randomNum(10);
    const randomNumber = randomNum(max);
    const isNegetive = ranNum % 2 === 0;
    return isNegetive ? -Math.abs(randomNumber) : Math.abs(randomNumber);
  },
}));
