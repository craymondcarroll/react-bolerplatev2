import React from 'react';
import {shallow} from 'enzyme';
import {LoginPage} from '../../components/LoginPage';


test("Should correctly render login page", ()=>{

const wrapper = shallow(<LoginPage />);
expect(wrapper).toMatchSnapshot();

});


test('Show call start login button called', () =>{
    const startLoginSpy = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={startLoginSpy} />);
    wrapper.find('button').simulate('click');
    expect(startLoginSpy).toHaveBeenCalled();

});