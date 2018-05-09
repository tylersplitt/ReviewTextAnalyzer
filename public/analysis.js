let analyzed = false;

function startAnalysis() {
    analyzed = true;
    showAnalysis();
    setAnalysisStats();

    setConcordanceGlobals();
    makeConcordance();

    setReviewListGlobals();
    makeAllReviewLists();

    let reset = select('#resetButton');
    reset.mousePressed(resetAnalysis);
}

function setAnalysisStats() {
    select('#selectedWord').html('Stats');

    let count = Object.keys(reviewSet.concordance).length;
    let reviewCount = reviewSet.reviews.length;
    let avgRating = reviewSet.avgRating;
    select('#totalReviewCount').html(reviewCount);
    select('#totalWordCount').html(count);
    select('#avgRating').html(nf(avgRating, 1, 2));

    selectAll('.wordStats').forEach(elt => elt.style('display', 'none'));
    selectAll('.reviewStats').forEach(elt => elt.style('display', 'list-item'));

    select('#allReviewTitle').style('display', 'block');
    select('#wordReviewTitle').style('display', 'none');
}

function setWordStats() {
    select('#selectedWord').html(selectedWord);

    let count = reviewSet.concordance[selectedWord];
    let reviewCount = reviewSet.wordReviewMap[selectedWord].length;
    let avgRating = reviewSet.wordRatings[selectedWord];
    select('#wordCount').html(count);
    select('#reviewCount').html(reviewCount);
    select('#avgRating').html(nf(avgRating, 1, 2));

    selectAll('.wordStats').forEach(elt => elt.style('display', 'list-item'));
    selectAll('.reviewStats').forEach(elt => elt.style('display', 'none'));

    select('#allReviewTitle').style('display', 'none');
    select('#wordReviewTitle').style('display', 'block');
    select('#selectedWordReview').html(selectedWord);
}

function appIdEntered() {
    let appId = select('#appIdInput').value();
    let appIdType = select('#appIdType').value();
    let data = {
        id: appId,
        userStopWords: userStopWords,
    }

    switch (appIdType) {
        case 'itunes':
            output.html('Loading iTunes App Reviews..');
            socket.emit('iTunesReviewRequest', data);
            break;
        case 'gplay':
            output.html('Loading Google Play App Reviews..');
            socket.emit('googlePlayReviewRequest', data);
            break;
        case 'json':
        default:
            output.html('Loading Test Data App Reviews..');
            loadJSON('reviews.json', serverResponded);
            break;
    }
    return false;
}

function updateReviewAnalysis() {
    let data = {
        userStopWords: userStopWords,
    }
    socket.emit('analyzeReviews', data)
}

function resetAnalysis() {
    analyzed = false;
    selectedWord = '';
    shownReviews = [0, 0, 0];
    shownWords = 0;

    hideAnalysis();

    resetConcordance();

    resetReviewLists();
}

function hideAnalysis() {
    select('#topbar').style('display', 'none');
    select('#appIdDiv').style('display', 'block');
    select('#analysisDiv').style('display', 'none');
}

function showAnalysis() {
    select('#appIdDiv').style('display', 'none');
    select('#topbar').style('display', 'flex');
    select('#analysisDiv').style('display', 'flex');
}