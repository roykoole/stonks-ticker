# Current Stonk Ticker Version v1.2.0

## v1.2.0 Added features:
* Added functionality to allow for the speed parameter in the URL
* Added functionality to allow for the direction parameter in the URL
* Added functionality to allow for the upEmoji parameter in the URL
* Added functionality to allow for the downEmoji parameter in the URL

### Changes
* Changed the way the animation is handled by css. 
    * The animation is moved over to react to allow for customisation.

## v1.1.0 Added features:
* The price now dynamically updates the title of the page.
* The emoji for up or down is added to the title for easy stock tracking

## v1.0.0 Added features:
* Displays GME stock by default
* Displays different color & emoji based off of the stock going up or down
    * Green color + rocket :rocket: emoji for stock price going up
    * Red color + poop :poop: emoji for stock price going down
* adding ?symbol= to the URL with a valid stock changes the displayed stock.
    * If no stock is specified it returns to GME
    * If a non existing stock is specified the program does nothing