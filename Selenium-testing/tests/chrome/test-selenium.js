// Selenium – získanie textového obsahu
const jSbook = '674108466cb6226060a20d44';
...
const jsBookPriceElement = await eShopPage.bookPrice(jSbook);
jSBookPrice = parseInt(await jsBookPriceElement.getText());