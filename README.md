# Stonk Ticker
Made with the [Coding Garden](https://www.youtube.com/channel/UCLNgu_OupwoeESgtab33CCw) | [video](https://www.youtube.com/watch?v=flxxyHeBowI) 

Read the Changelog to see what has happened.
Read the Roadmap to see what is going to happen and when. (*You can join in by making a push request for the next version!*)

## Current functionalities:
* Displays GME stock
* Displays different color & emoji based off of the stock going up or down
* URL Parameters
    * symbol={STOCK ABBR}
        * If no stock is specified it returns to GME
        * If a non existing stock is specified the program does nothing (v. 1.0.0)
    * speed={INT}
        * If no speed is specified it returns 20
        * If a non INT value is specified the program defaults to 20
    * direction=[normal, reverse, alternate, alternate-reverse]
        * If no direction is specified it returns normal
        * If an invalid direction is specified the program defaults to normal
    * upEmoji {Emoji}
        * If no Emoji is specified it uses the Rocket Emoji :rocket: 🚀
        * If a non Emoji character (Unicode) is specified it uses the Rocket Emoji :rocket: 🚀
    * downEmoji {Emoji}
        * If no Emoji is specified it uses the Poop Emoji :poop: 💩
        * If a non Emoji character (Unicode) is specified it uses the Poop Emoji :poop: 💩
* Dynamic stock updates in page title

Sample URL:
?symbol=DIS&speed=5&direction=alternate&upEmoji=😄&downEmoji=😢

Semantic versioning is used.

Download this project and run:
`npm start`

To build this project run:
`npm run build`