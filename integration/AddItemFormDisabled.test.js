describe('AddItemForm', () => {
    it('disabled example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=components-additemform--add-item-form-disabled-example&args=&viewMode=story');
        const image = await page.screenshot();
        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});
