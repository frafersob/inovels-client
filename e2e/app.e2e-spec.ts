import { InovelsClientPage } from './app.po';

describe('inovels-client App', function() {
  let page: InovelsClientPage;

  beforeEach(() => {
    page = new InovelsClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
