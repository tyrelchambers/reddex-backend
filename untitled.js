const fs = require('fs')
const dump = require('./contacts_dump.json')
const uuidv4 = require('uuid')

const convertObj = obj => {
  const userIds = [
    {
      _id: "5d6ee51e956325003dfa41b8",
      uuid: "ea303c71-cb20-4c14-9167-00f79ae3f560"
    },
    {
      _id: "5d844168c5b7fe003d714e93",
      uuid: "88446f90-a6f6-43df-a9be-2d9cf45c8464"
    },
    {
      _id: "5da211f6f94b63003d4c424f",
      uuid: "54459960-76e6-4e05-bf67-f624f2f85ee2"
    },
    {
      _id: "5e001b5daea5cc003d9f2c85",
      uuid: "3dc529a2-4bdb-4271-9764-7e82d22ccc70"
    },
    {
      _id: "5e23ccb0485214003d811fa1",
      uuid: "af25d4a5-8ae9-40de-baf0-b1341894e672"
    },
    {
      _id: "5e24fd6b62870a003d1dfd1d",
      uuid: "e8496332-a524-4b18-b1ee-363ea9447202"
    },
    {
      _id: "5e28eddd68842f003dbefa38",
      uuid: "c95372ca-0784-496d-b3f8-3c6abfdcb514"
    },
    {
      _id: "5e28f57268842f003dbefa39",
      uuid: "fe13074a-ec4e-4cea-b345-60ceddc4b024"
    },
    {
      _id: "5e29984b903357003db79a9e",
      uuid: "c54c61a2-ec88-4612-97b7-0587c43cb5f0"
    },
    {
      _id: "5e2d8f92d3fdb7003d312b62",
      uuid: "c61da107-4fd3-4d4e-9d16-621728b255cd"
    },
    {
      _id: "5d6b1c07b8a582003d42e622",
      uuid: "ffd8006a-bb57-40fe-b2dc-a49b85de066f"
    }
    
  ]
  const newObj = {
    "uuid": uuidv4(),
    author: obj.author || "",
    flair: obj.flair || "",
    num_comments: obj.num_comments.$numberInt || "",
    post_id: obj.postId || "",
    self_text: obj.selftext || "",
    title: obj.title || "",
    ups: obj.ups.$numberInt || "",
    url: obj.url || "",
    subreddit: obj.subreddit || "",
    permission: obj.permission || "",
    read: obj.read || "",
    user_id: ""
  }

  userIds.map(x => {
    if (x._id === obj.user_id.$oid) {
      newObj.user_id = x.uuid
    }
  })

  fs.writeFileSync('stories.json', JSON.stringify(newObj), {flag: 'a'})
}

for (let i = 0; i < dump.length; i++) {
  convertObj(dump[i])
}

