import {expect, test} from '@playwright/test';

test('Get Started link opens the Installation page', async ({page})=>{
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', {name: 'Get started'}).click();
    
    await expect(page).toHaveURL(/.*intro/);
    await expect(page.getByRole('heading', {name: 'Installation'})).toBeVisible();
});