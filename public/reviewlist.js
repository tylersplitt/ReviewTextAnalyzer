let reviewDivsTopDown = [];
let reviewDivsBottomUp = [];
let reviewDivsByDate = [];

const SORTDATE = 0;
const SORTHIGH = 1;
const SORTLOW = 2;

let sortMenu;
let sortType = SORTDATE;

function setReviewListGlobals() {
    sortMenu = select('#sortMenu');
    sortType = parseInt(sortMenu.value());

    sortMenu.changed(updateReviewList);
}

function makeAllReviewLists() {
    let topDownReviews = reviewSet.reviews.slice(0, reviewSet.reviews.length);
    topDownReviews.sort(goodReviewSorter);
    makeReviewDivs(topDownReviews, reviewDivsTopDown);

    let bottomUpReviews = reviewSet.reviews.slice(0, reviewSet.reviews.length);
    bottomUpReviews.sort(badReviewSorter);
    makeReviewDivs(bottomUpReviews, reviewDivsBottomUp);

    let dateSortedReviews = reviewSet.reviews.slice(0, reviewSet.reviews.length);
    dateSortedReviews.sort(dateSorter);
    makeReviewDivs(dateSortedReviews, reviewDivsByDate);

    currentReviewList = reviewDivsByDate;
}

function filterReviewList() {
    for (div of currentReviewList) {
        if (reviewContainsWord(div, selectedWord)) {
            div.style('display', 'block');
        } else {
            div.style('display', 'none');
        }
    }
}

function reviewContainsWord(div, word) {
    let text = div.elt.innerText.toLowerCase();
    let r = '\\b' + word + '\\b';
    let reg = new RegExp(r);
    return reg.test(text);
}

function updateReviewList() {
    shownReviews[sortType] = 0;
    sortType = parseInt(sortMenu.value());
    currentReviewList.forEach(d => d.style('display', 'none'));
    switch (sortType) {
        case SORTDATE:
            currentReviewList = reviewDivsByDate;
            break;
        case SORTHIGH:
            currentReviewList = reviewDivsTopDown;
            break;
        case SORTLOW:
            currentReviewList = reviewDivsBottomUp;
            break;
    }

    filterReviewList();
}

function showAllCurrentReviews() {
    currentReviewList.forEach(div => div.style('display', 'block'));
}

function resetReviewLists() {
    for (div of reviewDivsByDate) {
        div.remove();
    }
    for (div of reviewDivsBottomUp) {
        div.remove();
    }
    for (div of reviewDivsTopDown) {
        div.remove();
    }

    currentReviewList = undefined;
}

async function makeReviewDivs(missing, divArray) {
    console.log(missing.length);
    for (let i = 0; i < missing.length; i++) {
        divArray.push(await makeReviewDiv(missing[i]));
    }
    missing.splice(0, missing.length);
    console.log('rev done');
}

function makeReviewDiv(rev) {
    let stars = '*'.repeat(rev.rating);
    let div = createDiv('');
    div.parent(select('#allReviews'));
    div.addClass('review');
    div.style('padding-left', '5px');
    div.style('padding-right', '5px');
    div.style('display', 'none');
    let date = new Date(rev.date);
    let h = createP(stars + ' ' + rev.title + ' - ' + date.toDateString());
    h.style('font-weight', 'bold');
    h.parent(div);
    let p = createP(rev.content);
    p.html(p.html() + '<hr>');
    p.parent(div);
    return div;
}