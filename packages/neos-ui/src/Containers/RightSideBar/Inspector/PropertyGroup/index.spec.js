import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {mount} from 'enzyme';
import PropertyGroup from './index';
import {WrapWithMockGlobalRegistry} from '@neos-project/neos-ui-editors/src/_lib/testUtils';
import {registerLocale, registerTranslations} from '@neos-project/neos-ui-i18n';

const store = createStore(state => state, {});

beforeAll(() => {
    registerLocale('en-US', 'one,other');
    registerTranslations({
        'Neos_Neos': {
            'Main': {
                'Foo group': 'Foo group'
            }
        }
    });
});

test(`PropertyGroup > is rendered`, () => {
    const items = [
        {
            id: '1',
            type: 'editor',
            label: 'Foo',
            hidden: false
        },
        {
            id: '2',
            type: 'editor',
            label: 'Bar',
            hidden: true
        }
    ];

    const component = mount(
        <WrapWithMockGlobalRegistry>
            <Provider store={store}>
                <PropertyGroup
                    label="Foo group"
                    icon="question"
                    renderSecondaryInspector={() => {}}
                    node={{}}
                    items={items}
                    handlePanelToggle={() => {}}
                    commit={() => {}}
                />
            </Provider>
        </WrapWithMockGlobalRegistry>
    );

    expect(component.find('Headline').text()).toEqual(expect.stringContaining('Foo group'));
});

test(`PropertyGroup > is not rendered when all items are hidden`, () => {
    const items = [
        {
            id: '1',
            type: 'editor',
            label: 'Foo',
            hidden: true
        },
        {
            id: '2',
            type: 'editor',
            label: 'Bar',
            hidden: true
        }
    ];

    const component = mount(
        <WrapWithMockGlobalRegistry>
            <Provider store={store}>
                <PropertyGroup
                    label="Foo group"
                    icon="question"
                    renderSecondaryInspector={() => {}}
                    node={{}}
                    items={items}
                    handlePanelToggle={() => {}}
                    commit={() => {}}
                />
            </Provider>
        </WrapWithMockGlobalRegistry>
    );

    expect(component.find('Headline').length).toEqual(0);
});
