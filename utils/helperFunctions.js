//common functions

const { assert } = require("chai");
let premiumSecurityPrice;
let currentUrl;
let seeSolutionButton;
let categoryButton;
let categoryArea;
let initialPrice;
let currencySymbol;
let initialTotalPrice;

module.exports = {
  //function for clicking home or business solution links
  clickOnSolutionsLink(homeOrBusiness) {
    switch (homeOrBusiness) {
      case "home":
        seeSolutionButton = $(
          "//a[@class='button-1 d-sm-inline-block d-none' and @href='//www.bitdefender.com/solutions/']"
        );
        browser.pause(1000);
        seeSolutionButton.waitForExist({ timeout: 1000 });
        seeSolutionButton.click();
        currentUrl = browser.getUrl();
        assert.equal(currentUrl, "https://www.bitdefender.com/solutions/");
        break;
      case "business":
        seeSolutionButton = $(
          "//a[@class='button-1 d-sm-inline-block d-none' and @href='//www.bitdefender.com/business/']"
        );
        browser.pause(1000);
        seeSolutionButton.waitForExist({ timeout: 1000 });
        seeSolutionButton.click();
        currentUrl = browser.getUrl();
        assert.equal(currentUrl, "https://www.bitdefender.com/business/");
        break;
      default:
        console.log(`${productPriceCurrency} section is not valid`);
    }
  },

  savePriceAndCurrencyOnSolutionsPage() {
    browser.pause(1000);
    premiumSecurityPrice = $(
      '//*[@id="MultiplatformSecurity"]/div[2]/div[2]/div[2]/span[3]'
    ).getText();
    //extracting the currency symbol from the solutions page price
    currencySymbol = premiumSecurityPrice.replace(/[\d,.\s]/g, "");
  },

  clickOnPremiumSecurityBuyButton() {
    const buyNowPSecurity = $("div#MultiplatformSecurity .buy_elite.red__btn");
    browser.pause(1000);
    buyNowPSecurity.waitForExist({ timeout: 3000 });
    buyNowPSecurity.click();
    browser.pause(1000);
  },

  //function for clicking one of the home solutions category, and checking that the right category is displayed
  clickOnHomeSolutionsCategory(category) {
    browser.pause(1000);
    switch (category) {
      case "multiplatform":
        categoryButton = $("#mp-scroll");
        categoryButton.waitForExist();
        categoryButton.click();
        categoryArea = $("#MultiplatformSecurity");
        expect(categoryArea).toBeDisplayed();
        break;
      // more to be added
      default:
        console.log(`${category} category is not valid`);
    }
  },

  //function for selecting the initial currency, in cart the currency is update to the user's zone, for asserting that the cart price is correct
  //example: by default currency is US Dollar on solutions page, when a EU user adds a product to cart the currency automatically changes to Euro
  currencySelectors() {
    browser.pause(1000);
    const currencySelector = $("//select[@ng-change='changeCrcy(selected)']");
    switch (currencySymbol) {
      case "$":
        browser.pause(1000);
        currencySelector.waitForExist({ timeout: 1000 });
        currencySelector.selectByAttribute("value", "USD");
        break;
      case "€":
        currencySelector.selectByAttribute("value", "EUR");
        break;
      default:
        console.log(`${currencySymbol} symbol is not valid`);
    }
    initialTotalPrice = $('//span[@class="totalPrice ng-binding"]').getText();
  },

  //function for checking the solutions page price vs cart price
  checkSolutionsPagePriceVsCartPrice() {
    browser.pause(1000);
    assert.equal(premiumSecurityPrice, initialTotalPrice);
    return initialTotalPrice;
  },

  //function for updating the cart quantity
  updateCartQuantityAndCheckTotal(quantity) {
    //update cart quantity
    const updateQinput = $("#qty_21642367");
    updateQinput.waitForExist();
    updateQinput.clearValue();
    updateQinput.addValue(quantity);
    const updateButton = $('[data-text="update"');
    updateButton.waitForExist({ timeout: 2000 });
    updateButton.click();

    browser.pause(1000);
    //extract the numeric values of the initial and final total price
    let initPrice = module.exports.checkSolutionsPagePriceVsCartPrice();
    let initialTotalPriceValue = initPrice.replace(/[$€]/, "");
    const totalUpdatedPrice = $(
      '//span[@class="totalPrice ng-binding"]'
    ).getText();
    let totalPriceValue = totalUpdatedPrice.replace(/[$£€]/, "");

    //multiply the initial price with the quantity
    const updatedPrice = quantity * initialTotalPriceValue;

    //check that the price is correct after update
    assert.equal(updatedPrice, totalPriceValue);
  },

  //remove item from cart and check that the redirect is made
  clickOnDeleteItemOnCart() {
    browser.pause(1000);
    const deleteButton = $(".fa-trash-o");
    deleteButton.click();
    browser.pause(2000);
    currentUrl = browser.getUrl();
    assert.equal(currentUrl, "https://www.bitdefender.com/solutions/");
  },
};
