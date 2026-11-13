import {test, expect} from '@playwright/test';

test('checkboxes: checked and unchecked', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/checkboxes', {waitUntil: 'domcontentloaded'});

    const first = page.getByRole('checkbox').first();
    const second = page.getByRole('checkbox').last();

    await expect(first).not.toBeChecked();
    await first.check();
    await expect(first).toBeChecked();

    await expect(second).toBeChecked();
    await second.uncheck();
    await expect(second).not.toBeChecked();
});

test('dropdown: select an option', async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com/dropdown', {waitUntil: 'domcontentloaded'});

    const dropdown = page.locator('#dropdown');
    await dropdown.selectOption('2');
    await expect(dropdown).toHaveValue('2');
});

test('hover shows caption', async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com/hovers', {waitUntil: 'domcontentloaded'});
    await page.locator('.figure').first().hover();
    await expect(page.getByText('name: user1')).toBeVisible();
});

test('sort products by price and count items', async ({page})=>{
    await page.goto('https://www.saucedemo.com/', {waitUntil: 'domcontentloaded'});
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page.locator('.inventory_item')).toHaveCount(6);

    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');
});

test('Login Button and input assertions', async ({page})=>{
    await page.goto('https://www.saucedemo.com/', {waitUntil: 'domcontentloaded'});
    
    const username = page.getByPlaceholder('Username');
    await expect(page.getByRole('button', {name: 'Login'})).toBeEnabled();

    await username.fill('standard_user');
    await expect(username).toHaveValue('standard_user');
    await expect(username).toHaveAttribute('type', 'text');

    await username.press('Tab');
    console.log('Before password field');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    console.log('After password field');
    await page.getByPlaceholder('Password').press('Enter');
    await expect(page).toHaveURL(/inventory/);
})