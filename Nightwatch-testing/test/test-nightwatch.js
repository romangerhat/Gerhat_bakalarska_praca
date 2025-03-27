// Nightwatch – získanie textového obsahu
const jSbook = '674108466cb6226060a20d44';
...
eShopPage.bookPrice(jSbook).getText(function (result) {
    jSBookPrice = parseInt(result.value.replace('€', '').trim());
});