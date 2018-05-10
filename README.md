# Review Text Analyzer
An app that allows users to analyze reviews for any iTunes and Google Play apps.

[Try the app](https://review-text-analyzer.herokuapp.com/)

## How to use
Enter the app ID for the app you want to analyze. To find the app ID, visit [this link](https://support.bitly.com/hc/en-us/articles/230664607-What-is-an-App-ID-How-do-I-find-it-).

The app then reaches out to the iTunes Reviews API or scrapes the Google Play Store to find around 500-600 reviews from the app you submitted and analyzes the text and title content of the reviews. Once done, the site displays a filterable list of reviews and an interactive searchable concordance that tells you various stats of the reviews. 

## How it works
The app is built in JavaScript and has server-side backend code and client-side frontend code. 

### Server-side
The server-side code is written using [Node] as the package manager. The modules used in the app are the following:

| Module | Use |
| ------ | --- |
| [Express] | Creates web application |
| [Socket.IO] | Allows for socket connections between the client and the server |
| [iTunes App Reviews] | Accesses iTunes Review API to pull reviews for a given app |
| [Google Play Scraper] | Scrapes the Google Play Store for reviews for a given app |
| [RiTa.js] | Performs text analysis for concordances for the reviews |

### Client-side
The client-side code is written using an JavaScript library called [p5.js] for ease of DOM manipulation and [Bootstrap] for styling. To communicate with the server, the client-side [Socket.IO] library is used. 

## How to contribute
This project is open source and open to contribution from anyone. Review the **How to use** section to understand the codebase.

### Dependencies
- [Node.js]
- npm (included with Node)

### Setting up your local environment
1. Download and install [Node.js]
2. Clone the repo
3. Run `npm install`
4. Now you can run the app with `node server.js` (or any method for running node apps)

### References
- [p5.js Reference]
- [p5.js DOM Reference]
- [Bootstrap Reference]

<!-- Server-side Links -->
[Node.js]: https://nodejs.org/en/download/ "Node.js" 
[Express]: https://expressjs.com/ "Express"
[Socket.IO]: https://socket.io/ "Socket.IO"
[iTunes App Reviews]: https://www.npmjs.com/package/itunes-app-reviews "iTunes App Reviews"
[Google Play Scraper]: https://www.npmjs.com/package/google-play-scraper "Google Play Scraper"
[RiTa.js]: https://rednoise.org/rita/ "RiTa.js"

<!-- Client-side Links -->
[p5.js]: https://p5js.org/ "p5.js"
[Bootstrap]: https://getbootstrap.com/ "Bootstrap"
[p5.js Reference]: https://p5js.org/reference/ "p5.js Reference"
[p5.js DOM Reference]: https://p5js.org/reference/#/libraries/p5.dom "p5.js DOM Reference"
[Bootstrap Reference]: https://getbootstrap.com/docs/4.1/getting-started/introduction/ "Bootstrap Reference"
