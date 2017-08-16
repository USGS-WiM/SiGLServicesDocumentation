import { ServicesDocumentationPage } from './app.po';

describe('services-documentation App', () => {
  let page: ServicesDocumentationPage;

  beforeEach(() => {
    page = new ServicesDocumentationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
