import {
  configure, shallow, render, mount,
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

configure({ adapter: new Adapter() })


// global.React = React;
global.shallow = shallow
global.render = render
global.mount = mount
global.sinon = sinon
