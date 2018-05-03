import 'babel-polyfill';

describe('React application', () => {
  describe('open page', () => {
    it('should display title', async () => {
      await browser.get('/');
      expect(await $('h1').getText()).toBe('Kickstart Stocks');
    });
  });
});
