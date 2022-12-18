// const { Builder, Capabilities, By} = require('selenium-webdriver');
// require('chromedriver');
// const driver = new Builder.withCapabilities(Capabilities.chrome.build());

const ticTacToePlayer = require('../server/classes/TicTacToePlayer');

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

const simulatePlayerMove = async (id) => {
    //let spaceButton = await driver.findElement(By.xpath(`//button[@class='ttt-board-space'][1]`));
    let spaceButton = await driver.findElement(By.xpath(`//div[@id='${id}']/button`));
    await spaceButton.click();
}

const verifyComputerMove = async (turns) => {

}


describe('gameplay tests', () => {
    test(`verify that the first space displays the user's mark when it is clicked`, async () => {
        //let spaceButton = await driver.findElement(By.xpath(`//button[@class='ttt-board-space'][1]`));
        //await spaceButton.click();
        let cellReference = 'a1';
        simulatePlayerMove(cellReference);

        let result = await driver.findElement(By.id(cellReference)).getText();

        expect(result).toBe('X');
    });
    test(`verify that the computer's move is indicated on the game board`, async () => {
        let cellReference = '';
        let occupiedSpaces = 0;
        for(let i = 0; i < 9; i++)
        {
            if(i < 3)
            {
                cellReference = `a${i + 1}`;
            }
            else if(i < 6)
            {
                cellReference = `b${(i % 3) + 1}`;
            }
            else
            {
                cellReference = `c${(i % 3) + 1}`;
            }
            let gameSpaceContent = await driver.findElement(By.id(cellReference)).getText();
            if(gameSpaceContent === ticTacToePlayer.COMPUTER_CHARACTER)
            {
                occupiedSpaces++;
            }
        }
        expect(occupiedSpaces).toBe(1);
    });
});