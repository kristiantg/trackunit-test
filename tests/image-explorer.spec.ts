import { test, expect } from '@playwright/test';

test.describe('ImageExplorer Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display "No stickers found" when search has no results', async ({ page }) => {
        await page.waitForTimeout(1000);

        await page.getByPlaceholder('Search for stickers...').fill('thisisanonexistentsearchterm123456789');

        const noResultsText = await page.getByText('No stickers found');
        await expect(noResultsText).toBeVisible();
    });

    test('should display images when search has results', async ({ page }) => {
        await page.waitForTimeout(1000);

        await page.getByPlaceholder('Search for stickers...').fill('cat');

        await page.waitForSelector('img');

        const images = await page.locator('img').all();
        expect(images.length).toBe(3);
    });

    test('pagination controls should work correctly', async ({ page }) => {
        await page.waitForTimeout(1000);

        await page.getByPlaceholder('Search for stickers...').fill('cat');

        const previousButton = await page.getByRole('button', { name: 'Previous' });
        const nextButton = await page.getByRole('button', { name: 'Next' });

        await expect(previousButton).toBeDisabled();
        await expect(nextButton).toBeEnabled();

        await nextButton.click();
        await expect(page).toHaveURL(/.*offset=3/);

        await expect(previousButton).toBeEnabled();

        await previousButton.click();
        await expect(page).toHaveURL(/.*offset=0/);
        await expect(previousButton).toBeDisabled();
    });

    test('should maintain state across URL changes', async ({ page }) => {
        await page.waitForTimeout(1000);

        await page.getByPlaceholder('Search for stickers...').fill('cat');
        await page.getByRole('button', { name: 'Next' }).click();

        await page.reload();

        await expect(page).toHaveURL(/.*q=cat/);
        await expect(page).toHaveURL(/.*offset=3/);

        await expect(page.getByPlaceholder('Search for stickers...')).toHaveValue('cat');
        await expect(page.getByRole('button', { name: 'Previous' })).toBeEnabled();
    });
}); 