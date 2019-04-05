import React from "react";
import Enzyme, { mount } from "enzyme";
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

Enzyme.configure({ adapter: new Adapter() })

describe("App", () => {
	const getComponent = (props) => {
		return new Promise((resolve, reject) => {
			var component;
			component = mount(
				<App {...props} onLoad={ () => resolve(component) } />
			);
		});
	}

	beforeEach(() => {
	});
	
	it("Exists", () => {
		return getComponent().then((component) => {
			const instance = component.instance();
			expect(
				typeof instance
			).to.eq('object')
		});
	})
});
