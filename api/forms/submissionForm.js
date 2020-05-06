import express from 'express'
import emailCon from '../../libs/emailConfig'
import {authHandler} from '../../middleware/middleware.js'
import Website from '../../db/Models/Website'
import SubmissionFormOptions from '../../db/Models/SubmissionFormOptions'
import SubmittedStories from '../../db/Models/SubmittedStories'
import OptionsAuthor from '../../db/Models/OptionsAuthor'
import OptionsEmail from '../../db/Models/OptionsEmail'
import OptionsSentToOthers from '../../db/Models/OptionsSentToOthers'
import OptionsTags from '../../db/Models/OptionsTags'
import OptionsStoryTitle from '../../db/Models/OptionsStoryTitle'

const app = express.Router();

app.post('/submit', async (req, res, next) => {
  try {
    const story_email = req.sanitize(req.body.OptionsEmail.value);
    const author = req.sanitize(req.body.OptionsAuthor.value);
    const tags = req.sanitize(req.body.OptionsTag.value);
    const sent_to_others = req.body.OptionsSentToOther;
    const website = req.sanitize(req.body.website_id);
    const story_title = req.sanitize(req.body.OptionsStoryTitle.value);
    const body = req.sanitize(req.body.body)

    const sent_to_others_formatted = sent_to_others.value === null ? false : sent_to_others.value;

    const subdomain = await Website.findOne({
      where: {
        uuid: website
      },
      include: "User"
    })

    await SubmittedStories.create({
      email: story_email,
      author,
      tags,
      sent_to_others: sent_to_others_formatted,
      story_title,
      body,
      user_id: subdomain.User.uuid
    })

    emailCon
    .send({
      template: 'mars',
      message: {
        to: subdomain.User.email
      },
      
      locals: {
        email: story_email,
        story_title,
        author,
        body,
        sent_to_others
      }
    })
    .then()
    .catch(console.error);

    res.status(200).json({message: "Your story has been sent, thank you!"});
  }
  
  catch (error) {
    next(error)

  }
});

app.put('/save', authHandler, async (req, res, next) => {
  try {
    const {
      enabled,
      OptionsAuthor: author,
      OptionsEmail: email,
      OptionsSentToOther: sent_to_others,
      OptionsTag: tags,
      OptionsStoryTitle: story_title,
      options_id,
      website
    } = req.body;
    await SubmissionFormOptions.update({
      enabled
    },{
      where: {
        website_id: website
      }
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })

    await OptionsAuthor.update({
      value: author.value,
      label: author.label,
      required: author.required,
      enabled: author.enabled,
      options_id
    }, {
      where: {
        options_id
      }
    })

    await OptionsEmail.update({
      value: email.value,
      label: email.label,
      required: email.required,
      enabled: email.enabled,
      options_id
    }, {
      where: {
        options_id
      }
    })

    await OptionsSentToOthers.update({
      value: sent_to_others.value,
      label: sent_to_others.label,
      required: sent_to_others.required,
      enabled: sent_to_others.enabled,
      options_id
    }, {
      where: {
        options_id
      }
    })

    await OptionsTags.update({
      value: tags.value,
      label: tags.label,
      required: tags.required,
      enabled: tags.enabled,
      options_id
    }, {
      where: {
        options_id
      }
    })

    await OptionsStoryTitle.update({
      value: story_title.value,
      label: story_title.label,
      required: story_title.required,
      enabled: story_title.enabled,
      options_id
    }, {
      where: {
        options_id
      }
    })

    res.sendStatus(200);
  }

  catch(err) {
    next(err)

  }
}) 

app.get('/', async (req, res, next) => {
  try {
    const {
      sid
    } = req.query;

    const form = await SubmissionFormOptions.findOrCreate({
      where: {
        website_id: sid
      },
      include: [OptionsAuthor, OptionsTags, OptionsEmail, OptionsSentToOthers, OptionsStoryTitle]
    }).then(res => {
      if (res) {
        console.log(res, '----- res')
        return res.dataValues
      }
    })

    console.log(form, '--- before init')

    if (!form.OptionsAuthor || !form.OptionsEmail || !form.OptionsTag || !form.OptionsStoryTitle || !form.OptionsSentToOther) {
      await OptionsAuthor.findOrCreate({
        where: {
          options_id: form.uuid
        }
      })
      await OptionsEmail.findOrCreate({
        where: {
          options_id: form.uuid
        }
      })
      await OptionsSentToOthers.findOrCreate({
        where: {
          options_id: form.uuid
        }
      })
      await OptionsTags.findOrCreate({
        where: {
          options_id: form.uuid
        }
      })
      await OptionsStoryTitle.findOrCreate({
        where: {
          options_id: form.uuid
        }
      })
  
    }

    const formRefetched = await SubmissionFormOptions.findOne({

      where: {
        website_id: sid
      },
      include: [OptionsAuthor, OptionsTags, OptionsEmail, OptionsSentToOthers, OptionsStoryTitle]
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })

    console.log(formRefetched, '--- after init')



    res.send(formRefetched)
  }

  catch(err) {
    next(err)

  }
})


module.exports = app;
