import Axios from 'axios'
import path from 'path'
import fs, { write } from 'fs'

let data = "";

let links = [
  "https://www.reddit.com/r/nosleep/comments/bpcmx8/i_found_a_recipe_box_service_on_the_dark_web/",
  "https://www.reddit.com/r/nosleep/comments/enacmh/my_mom_hired_a_clown_off_the_dark_web/",
  "https://www.reddit.com/r/nosleep/comments/eapf64/i_found_a_game_on_the_dark_web/",
  "https://www.reddit.com/r/nosleep/comments/efpfj6/the_dark_web_is_now_impacting_dating_apps/",
  "https://www.reddit.com/r/nosleep/comments/edweuf/i_found_an_ai_on_the_dark_web/",
  "https://www.reddit.com/r/nosleep/comments/e0w3w9/im_caught_in_a_dark_web_challenge_and_need_help/",
  "https://www.reddit.com/r/nosleep/comments/dipzza/i_met_my_killer_through_an_app_i_found_on_the/",
  "https://www.reddit.com/r/nosleep/comments/e7hhfw/i_thought_i_was_working_for_amazon_but_i_was/",
  "https://www.reddit.com/r/nosleep/comments/cldgos/i_ordered_myself_on_the_dark_web/",
  "https://www.reddit.com/r/nosleep/comments/d5xxuc/i_found_a_very_different_doctor_in_the_dark_web/",
  "https://www.reddit.com/r/nosleep/comments/byylfz/dark_web/",
  "https://www.reddit.com/r/nosleep/comments/ald898/i_found_out_what_happened_to_my_friend_on_the/",
  "https://www.reddit.com/r/nosleep/comments/c9yeb4/i_am_being_stalked_by_someone_on_the_dark_web/",
  "https://www.reddit.com/r/nosleep/comments/90ksmo/i_bought_a_mystery_box_off_the_dark_web/"
]

const main = async () => {
  const directory = "samples/dark_web";
  const formattedData = [];

  makeDir(directory)
  const data = await getData()
  
  data.map(x => {
    let selftext = x.data.selftext;
    let matched = selftext.replace(/\W/gi, ' ');
    formattedData.push(matched)
  })

  for (let i = 0; i < formattedData.length; i++ ) {
    writeToFile(formattedData[i], i)
  }
}

const getData = async () => {
  let posts = [];
  let after = ``;

  for ( let i = 0; after !== null; i++ ) {

    await Axios.get(`https://www.reddit.com/r/nosleep/search/.json?q=dark%20web&restrict_sr=1&after=${after}`).then(res => {
      after = res.data.data.after;
      posts = [...posts, ...res.data.data.children]
    }).catch(err => err);
  }

  return posts;
}

const writeToFile = (data, i) => {
  fs.writeFile(`${__dirname}/samples/dark_web/sample_${i}.txt`, data, err => {
    if (err) throw err;
    console.log(`Saved file: sample_${i}.txt`)
  })  
}
const makeDir = async (dir) => {
  fs.mkdir(dir, {recursive: true}, err => {
    console.log(err)
  }); 
}
main();

