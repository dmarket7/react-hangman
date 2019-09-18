import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Hangman from './Hangman';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Hangman />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders using shallow", function() {
  // this test passes
  let wrapper = shallow(<Hangman />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("renders using mount", function() {
  // this test fails!
  let wrapper = mount(<Hangman />);
  wrapper.setState({answer: "apple"})
  expect(wrapper.html()).toContain("<img")
  wrapper.setState({nWrong: 1});
  expect(wrapper.html()).toContain("<img src=\"1.jpg\">")

  wrapper.setState({guessed: new Set('a')});
  expect(wrapper.html()).toContain("<img src=\"1.jpg\">")

  wrapper.setState({nWrong: 6});
  expect(wrapper.html()).toContain("You LOSE!!!")

});



// it("matches snapshot for adopted dogs", function() {
//   let wrapper = shallow(<Hangman />);
//   let serialized = toJson(wrapper);
//   expect(serialized).toMatchSnapshot();
// });