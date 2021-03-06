function getWords(e) {
  e.preventDefault();
  // get form values
  let related_to = document.getElementById('related_to').value;
  let noun_desc = document.getElementById('noun_desc').value;
  let rhyme = document.getElementById('rhymes_with').value;
  let near_rhyme = document.getElementById('near-rhyme').checked;
  let start = document.getElementById('starts_with').value;
  let end = document.getElementById('ends_with').value;

  // setup URL
  let url = "https://api.datamuse.com/words?";
  if (related_to !== "") {
    url += "&ml=" + related_to;
  }
  if (noun_desc !== "") {
    url += "&rel_jjb=" + noun_desc;
  }
  if (rhyme !== "") {
    let rhyme_type = near_rhyme ? "&rel_nry=" : "&rel_rhy=";
    url += rhyme_type + rhyme;
  }
  if (start !== "" || end !== "") {
    url += "&sp=" + start + "*" + end;
  }
  //url += "&v=enwiki";


  fetch(url)
  .then(function(response) {
    if (response.status != 200) {
      return {
        text: "Error calling API service: " + response.statusText
      }
    }
    return response.json();
  }).then(function(json) {
    let words = [];
    let scores = [];
    for(let match of json) {
      words.push(match.word);
      scores.push(match.score);
    }
    displayWords(words);
  });

}

function displayWords(words) {
  let display = document.getElementById('word-display');
  if (words.length > 0) {
    html = "";
    for(let word of words) {
      html += '<div class="m-2 p-2 alert alert-success">' + word + '</div>'
    }
    display.innerHTML = html;
  } else {
    display.innerHTML = "<p>We couldn't find any words matching that description... Looks like you'll have to make your own!</p>" +
    "<p><strong>Tip:</strong> Try using only one box at a time. You can get more specific after you know what you have to work with.</p>"
  }
}

document.getElementById('get').addEventListener('click', getWords);
