'use strict';

const { browser, element } = require("protractor");

var productCount = 21;
var orderCount = 6;
describe('cartWidget directive',function() {
  it('redirects after clicking the button', async function() {

    await browser.get('http://localhost:8000/index.html#!/products');
    await browser.sleep(5000);
    await element(by.linkText('Checkout')).click();
    expect(await browser.getCurrentUrl()).toBe('http://localhost:8000/index.html#!/checkout');
    
  })

 
});

describe('adminApp', function() {
 
  it('should authenticate a user',async function() {
 
    await browser.get('http://localhost:8000/admin/index.html#!/login');
    await element(by.model('email')).sendKeys('bob@shmob.gg');
    await element(by.model('password')).sendKeys('555666');
    await element(by.id('authButton')).click();
    await browser.sleep(3000);
    expect(await browser.getCurrentUrl()).toBe('http://localhost:8000/admin/index.html#!/main');
    var trCollection = await element.all(by.css('tr[ng-repeat]'));
    expect(trCollection.length).toBe(productCount);
   
  });

  it('create a product',async function() {
    expect(await browser.getCurrentUrl()).toBe('http://localhost:8000/admin/index.html#!/main');
    await element(by.model('userData.name')).sendKeys('baseball bat');
    await element(by.model('userData.description')).sendKeys('for baseball, or something else');
    await element(by.model('userData.category')).sendKeys('baseball');
    await element(by.model('userData.price')).sendKeys(45);
    await element(by.buttonText('Create')).click();
    await browser.sleep(1000);
    var products = await element.all(by.css('tr[ng-repeat]'));
    expect(products.length).toBe(productCount+1);
   
  })

  it('editing a product',async function() {
    var products = await element.all(by.css('tr[ng-repeat]'));
    expect(products.length).toBe(productCount+1);
    var el = element(by.css('td[name="baseball bat"] button:nth-child(1)'));
    await el.click();
    await element(by.model('userData.price')).sendKeys(40);
    await browser.executeScript('window.scrollTo(0,document.body.scrollHeight)');
    await element(by.buttonText('Cancel')).click();
    var baseballPrice = await element(by.repeater('product in products').row(21).column('product.price'));
    expect(await baseballPrice.getText() ).toEqual('$45.00');
    await el.click();
    await element(by.model('userData.price')).clear().sendKeys(40);
    await element(by.buttonText('Save')).click();
    expect(await baseballPrice.getText() ).toEqual('$40.00');
  })

  it('delete a product' ,async function() {
    var products = await element.all(by.css('tr[ng-repeat]'));
    expect(products.length).toBe(productCount+1);
    var el = element(by.css('td[name="baseball bat"] button:nth-child(2)'));
    await el.click();
    products = await element.all(by.css('tr[ng-repeat]'));
    expect(products.length).toBe(productCount);
  })

  it('get orders',async function() {
    await element(by.buttonText('Orders')).click();
    var allOrders= await element.all(by.css('tr[ng-repeat]'));
    expect(allOrders.length).toBe(orderCount);
  })
  it('click Details btn',async function() {
    var btn =await element(by.css('#orders tr[ng-repeat]:nth-child(4) button'));
    await btn.click();
    var rowStr = 'div[ng-show] tr[ng-repeat]:nth-child(2)';
    var name = await element(by.css(rowStr + '>td:nth-child(1)'));
    var count = await element(by.css(rowStr + '>td:nth-child(2)'));
    var price = await element(by.css(rowStr + '>td:nth-child(3)'));
    expect(await name.getText()).toEqual('BMX bike e500');
    expect(await count.getText()).toEqual('1');
    expect(await price.getText()).toEqual('3');

  })


  
})
