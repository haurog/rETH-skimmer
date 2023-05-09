# rETH skimmer

Solo stakers on Ethereum can easily see how much ETH they have made by looking at the ETH balance on their withdrawal address.

For rETH holders it is a bit more difficult as rETH does not rebase and therefore a holder always have the same amount of rETH which increases in value. If an reth holder wants to skim the rewards they have to manually calculate the exchange rate for a certain period and sell the excess.

This website calculates the rETH value increase relative to ETH for a given period and directly exchanges the excess rETH to ETH using the deposit contract.


To develop do the following:

1. `npm install`
2. `npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch`
3. `npm start`

A browser window should open with the current state of the website. Happy coding.


## Used tools

Uses rainbow kit for wallet connection and tailwind-ui for UI elements.