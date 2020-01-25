import Axios from 'axios'
import fs from 'fs'

const directory = "samples/lets_not_meet";

const main = async () => {
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

    await Axios.get(`https://www.reddit.com/r/letsnotmeet.json?after=${after}&count=50`).then(res => {
      after = res.data.data.after;
      posts = [...posts, ...res.data.data.children]

    }).catch(err => err);
  }

  
  return posts;
}

const writeToFile = (data, i) => {
  fs.writeFileSync(`${__dirname}/${directory}/sample_${i}.txt`, data)  
}
const makeDir = async (dir) => {
  fs.mkdir(dir, {recursive: true}, err => {
    console.log(err)
  }); 
}
main();

