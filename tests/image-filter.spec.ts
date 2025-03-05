import { test, expect } from '@playwright/test';


test.describe('ImageFilter Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should render search input', async ({ page }) => {
        const searchInput = await page.getByPlaceholder('Search for stickers...');
        await expect(searchInput).toBeVisible();
    });

    test('should update URL when searching', async ({ page }) => {
        const searchInput = await page.getByPlaceholder('Search for stickers...');

        await searchInput.fill('test');

        await expect(page).toHaveURL(/.*[?&]q=test/);
        await expect(page).toHaveURL(/.*[?&]offset=0/);
    });

    test('should preserve search value after page reload', async ({ page }) => {
        const searchInput = await page.getByPlaceholder('Search for stickers...');

        await searchInput.fill('test');

        await page.reload();

        await expect(searchInput).toHaveValue('test');
    });

    test('should clear search results when input is cleared', async ({ page }) => {
        const searchInput = await page.getByPlaceholder('Search for stickers...');

        await searchInput.fill('test');
        await searchInput.fill('');

        await expect(page).toHaveURL(/.*[?&]q=/);
        await expect(page).toHaveURL(/.*[?&]offset=0/);
    });
}); 