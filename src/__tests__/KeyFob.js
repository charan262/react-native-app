import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import KeyFob from '../components/KeyFob';
// import Adapter from 'enzyme-adapter-react-15';
// import { shallow } from 'enzyme';

it('renders correctly', () => {
  const component = renderer.create(
    <KeyFob />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


// it('disables KeyFob when making async call', done => {
//     const wrapper = shallow(<KeyFob />);
//     wrapper.instance().keyFobPress("LOCK");
// });
