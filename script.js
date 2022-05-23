const answer = document.querySelector(".questions");


// load JSON with FetchAPI
const load = async () => {
    let url = 'https://pub-quiz-game.herokuapp.com/history';
    let obj = null;

    try {
        obj = await (await fetch(url)).json();
    } catch (e) {
        console.log('error');
    }

    console.log(obj);
}

load();