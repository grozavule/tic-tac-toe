// const { Builder, Capabilities, By} = require('selenium-webdriver');
// require('chromedriver');
// const driver = new Builder.withCapabilities(Capabilities.chrome.build());

const { Builder, By, Key, promise, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

let options = new firefox.Options()
     .setPreference('extensions.firebug.showChromeErrors', true);

const driver = new Builder()
    .forBrowser('firefox')
    .build();
     
beforeAll(async() => {
    console.log(`navigating to tic-tac-toe`);
    await driver.get(`http://localhost:5005`);
});

afterAll(async() => {
    driver.quit();
})

// const simulatePlayerMove = async (id) => {
//     let spaceButton = await driver.findElement(By.xpath(`//button[@class='ttt-board-space'][1]`));
//     await spaceButton.click();
// }


describe('gameplay tests', () => {
    test(`verify that the first space displays the user's mark when it is clicked`, async () => {
        let spaceButton = await driver.findElement(By.xpath(`//button[@class='ttt-board-space'][1]`));
        await spaceButton.click();

        let result = await driver.findElement(By.id('a1')).getText();

        expect(result).toBe('X');
    });
    // test(`verify that the computer's move is indicated on the game board`, async () => {
    //     for(let i = 1; i <= 9; i++)
    //     {

    //     }
    // });
});