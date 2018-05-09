// MyQ Chamberlain - 636030203 com.chamberlain.myq.chamberlain

let output;

let socket;

let reviewSet;

let selectedWord = '';

let userStopWords = [];

let currentReviewList;
let shownReviews = [0, 0, 0];
let shownWords = 0;

function setup() {
  noCanvas();

  socket = io.connect('https://review-text-analyzer.herokuapp.com');
  // socket = io.connect('http://localhost:3000');

  socket.on('reviewResponse', serverResponded);
  socket.on('reviewError', serverRespondedError);

  output = select('#output');

  //     userStopWords.push(word);
  //     updateReviewAnalysis();

}

function serverResponded(data) {
  console.log(data);
  if (data && data.reviews && data.reviews.reviews.length > 0) {
    reviewSet = data.reviews;
    startAnalysis();
    output.html('');
  } else {
    output.html('No reviews found');
  }
}

function serverRespondedError(error) {
  console.log(error);
  output.html('Server encountered an error retrieving reviews. Check console for error.');
}

function draw() {
  if (analyzed) {
    if (currentReviewList && shownReviews[sortType] < currentReviewList.length) {
      let div = currentReviewList[shownReviews[sortType]];
      if (reviewContainsWord(div, selectedWord)) {
        div.style('display', 'block');
      }
      shownReviews[sortType]++;
    }
    for (let i = 0; i < 10; i++) {
      if (wordSpans && shownWords < wordSpans.length && shownWords < maxWords) {
        let ws = wordSpans[shownWords];
        ws.style('display', 'inline');
        shownWords++;
      }
    }
  }
}
