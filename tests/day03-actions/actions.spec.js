import {test, expect} from '@playwright/test';

test('checkboxes: checked and unchecked', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/checkboxes', {waitUntil: 'domcontentloaded'});

    const first = page.getByRole('checkbox').first();
    const second = page.getByRole('checkbox').second();

    await expect(first).not.toBeChecked();
    await first.check();
    await expect(first).toBeChecked();
})