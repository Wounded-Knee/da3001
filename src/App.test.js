import React from "react";
import Enzyme, { mount } from "enzyme";
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { userData } from './data/TestData.js';
import { expect } from 'chai';

Enzyme.configure({ adapter: new Adapter() })

describe("App", () => {
	let component,
		instance,
		appWillLoad;

	const getComponent = (props) => {
		return new Promise((resolve, reject) => {
			var component;
			component = mount(
				<App {...props} onLoad={ () => resolve(component) } />
			);
		});
	}

	beforeEach(() => {
		appWillLoad = undefined;
		instance = undefined;
	});
	
	it("getTestById()", () => {
		return getComponent().then((component) => {
			const instance = component.instance();
			expect(
				instance.getTestById(0)
			).to.equal(instance.state.tests[0])
		});
	})
});
