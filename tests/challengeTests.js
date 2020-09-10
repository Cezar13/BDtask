//tests declarations and runner

import {
  currencySelectors,
  clickOnSolutionsLink,
  clickOnHomeSolutionsCategory,
  updateCartQuantityAndCheckTotal,
  savePriceAndCurrencyOnSolutionsPage,
  clickOnPremiumSecurityBuyButton,
  checkSolutionsPagePriceVsCartPrice,
  clickOnDeleteItemOnCart,
} from "../utils/helperFunctions";

describe("challenge 1 and 2 from homework", () => {
  before(() => {
    //open chrome browser and navigate to www.bitdefender.com
    browser.url("https://www.bitdefender.com/");
    //dismiss the cookie pop up
    browser.pause(1000);
    const okCookieBtn = $("#CybotCookiebotDialogBodyButtonAccept");
    okCookieBtn.click();
  });

  it("Adding product to card, checking price, updating the cart and checking total, deleting the item from cart", () => {
    //Challenge1
    // navigate to Home-> See solutions
    clickOnSolutionsLink("home");

    // find and click Multiplatform
    clickOnHomeSolutionsCategory("multiplatform");

    //saving the price and currency for asserting
    savePriceAndCurrencyOnSolutionsPage();

    //select Premium Security -> Buy now
    clickOnPremiumSecurityBuyButton();

    //change the currency to the one from solutions page
    currencySelectors();

    //check that the correct price is displayed in cart
    checkSolutionsPagePriceVsCartPrice();

    //Challenge2
    // in cart, change quantity to 2 and hit update
    updateCartQuantityAndCheckTotal(2);

    //remove item from cart by clicking remove icon
    clickOnDeleteItemOnCart();
  });
});
