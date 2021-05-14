import { useEffect, useState } from "react";
import protobuf from "protobufjs";
const { Buffer } = require("buffer/");

var emojis;

const regexEmoji = new RegExp('(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])')
const speed = new RegExp("^[0-9]+$");
const flow = ["normal", "reverse", "alternate", "alternate-reverse"]

var divStyle;

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function App() {
  const [stonk, setStonk] = useState(null);
  const [direction, setDirection] = useState("");
  useEffect(() => {
    document.title = "Please wait...";
    const params = new URLSearchParams(window.location.search);
    
    divStyle = {
      animation: 'scroll '+ (speed.test(params.get("speed")) ? params.get("speed") : "20") +'s infinite ' + (flow.includes(params.get("direction")) ?  params.get("direction") : "normal") +' linear'
    };


    if(params.get('upEmoji') && params.get('downEmoji') && regexEmoji.test(params.get('upEmoji')) && regexEmoji.test(params.get('downEmoji'))){
      emojis = {
        "":"",
        up:params.get('upEmoji'),
        down:params.get('downEmoji'),
      }
    }
    else if(params.get('upEmoji') && regexEmoji.test(params.get('upEmoji'))){
      emojis = {
        "":"",
        up:params.get('upEmoji'),
        down:"💩",
      }
    }
    else if(params.get('downEmoji') && regexEmoji.test(params.get('downEmoji'))){
      emojis = {
        "":"",
        up:"🚀",
        down:params.get('downEmoji'),
      }
    }
    else{
      emojis = {
        "": "",
        up: "🚀",
        down: "💩",
      };
    }

    console.log(emojis)
    const ws = new WebSocket("wss://streamer.finance.yahoo.com");
    protobuf.load("./YPricingData.proto", (error, root) => {
      const Yaticker = root.lookupType("yaticker");
      if (error) {
        console.log(error);
      }
      ws.onopen = function open() {
        console.log("connected");
        ws.send(
          JSON.stringify({
            subscribe: [(params.get("symbol") || "GME").toUpperCase()],
          })
        );
      };

      ws.onclose = function close() {
        console.log("disconnected");
      };

      ws.onmessage = function incoming(message) {
        const next = Yaticker.decode(new Buffer(message.data, "base64"));
        
        setStonk((current) => {
          var nextDirection = "";
          if (current) {
            nextDirection = current.price < next.price ? "up" : current.price > next.price ? "down" : "";
            if (nextDirection) {
              setDirection(nextDirection);
            }
          }
          document.title = next.id + " " + formatPrice(next.price) + " " + emojis[nextDirection];
          return next;
        });
      };
    });
  }, []);

  return (
    <div className="stonk" style={divStyle}>
      {stonk && (
        <h2 className={direction}>
          {stonk.id} {formatPrice(stonk.price)} {emojis[direction]}
        </h2>
      )}
    </div>
  );
}

export default App;
