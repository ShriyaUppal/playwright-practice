import {test, expect} from '@playwright/test';

test('login with different locators', async({page})=>{
    await page.goto('https://www.saucedemo.com/', {waitUntil: 'domcontentloaded'});

    //By placeholder
    await page.getByPlaceholder('Username').fill('standard_user');

    //By css(id)
    await page.locator('#password').fill('secret_sauce');

    //By Role
    await page.getByRole('button', {name: 'Login'}).click();

    //By Text
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page).toHaveURL(/inventory/);
});

test('add item to the cart', async ({page})=>{
    await page.goto('https://www.saucedemo.com/', {waitUntil: 'domcontentloaded'});
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();

    //by attribute (CSS)
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    //by CSS class
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('Invalid login shows error', async ({page})=>{
    await page.goto('https://www.saucedemo.com/', {waitUntil: 'domcontentloaded'});
    await page.getByPlaceholder('Username').fill('wrong_user');
    await page.getByPlaceholder('Password').fill('wrong_pass');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page.locator('[data-test="error"]')).toContainText('do not match')

})

