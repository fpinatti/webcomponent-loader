import { newE2EPage } from '@stencil/core/testing';

describe('threed-loader', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<threed-loader></threed-loader>');

    const element = await page.find('threed-loader');
    expect(element).toHaveClass('hydrated');
  });
});
