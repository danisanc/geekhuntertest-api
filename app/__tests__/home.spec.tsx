import renderer from 'react-test-renderer';

import Home from '../pages/index';

it('renders home page correctly', () => {
  const tree = renderer
    .create(<Home />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});