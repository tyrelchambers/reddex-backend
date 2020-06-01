import express from 'express'
import {authHandler } from '../../middleware/middleware';

import Website from '../../db/Models/Website'
import User from '../../db/Models/User'
import SubmissionFormOptions from '../../db/Models/SubmissionFormOptions'
import OptionsAuthor from '../../db/Models/OptionsAuthor'
import OptionsEmail from '../../db/Models/OptionsEmail'
import OptionsSentToOthers from '../../db/Models/OptionsSentToOthers'
import OptionsTags from '../../db/Models/OptionsTags'
import OptionsStoryTitle from '../../db/Models/OptionsStoryTitle'

const app = express.Router();

app.post('/activate', authHandler, async (req, res, next) => {
  try {
    const website = await Website.create({
      user_id: res.locals.userId

    }, {
      returning: true
    }).then(res => res.dataValues)
    
    await User.update({
      website_id: website.uuid
    }, {
      where: {
        uuid: res.locals.userId
      }
    })

    const options = await SubmissionFormOptions.create({
      website_id: website.uuid
    }, {
      returning: true
    }).then(res => res.dataValues)
    
    await OptionsAuthor.create({
      options_id: options.uuid
    })
    await OptionsEmail.create({
      options_id: options.uuid
    })
    await OptionsSentToOthers.create({
      options_id: options.uuid
    })
    await OptionsTags.create({
      options_id: options.uuid
    })
    await OptionsStoryTitle.create({
      options_id: options.uuid
    })


    res.send({
      website,
      options
    });
  }

  catch(err) {
    next(err)

  }
})

app.post('/update', authHandler, async (req, res, next) => {
  try {
    const subdomain = req.sanitize(req.body.subdomain);
    const title = req.sanitize(req.body.title);
    const twitter = req.sanitize(req.body.twitter);
    const facebook = req.sanitize(req.body.facebook);
    const instagram = req.sanitize(req.body.instagram);
    const patreon = req.sanitize(req.body.patreon);
    const youtube = req.sanitize(req.body.youtube);
    const podcast = req.sanitize(req.body.podcast);
    const accent = req.sanitize(req.body.accent);
    const theme = req.sanitize(req.body.theme);
    const introduction = req.sanitize(req.body.introduction);
    const banner_url = req.body.banner_url;
    const submission_form = req.body.submission_form;
    const youtube_id = req.sanitize(req.body.youtube_id);
    const youtube_timeline = req.body.youtube_timeline;
    const twitter_id = req.sanitize(req.body.twitter_id);
    const twitter_timeline = req.body.twitter_timeline;
    const show_credit_link = req.body.show_credit_link;
    const headline = req.sanitize(req.body.headline)
    const submission_title = req.sanitize(req.body.submission_title);
    const rules = req.sanitize(req.body.rules);
    const thumbnail = req.body.thumbnail;
    
    const website = await Website.update({
      subdomain,
      title,
      twitter,
      facebook,
      instagram,
      patreon,
      youtube,
      podcast,
      accent,
      theme,
      introduction,
      banner_url,
      submission_form,
      youtube_id,
      youtube_timeline,
      twitter_id,
      twitter_timeline,
      show_credit_link,
      headline,
      submission_title,
      rules,
      thumbnail
    }, {
      where: {
        user_id: res.locals.userId

      },
      returning: true,
      plain: true
    }).then(res => res[1].dataValues)

    res.send(website)
  }

  catch(err) {
    next(err)

  }
})

app.get('/config', authHandler, async (req, res, next) => {
  try {
    const website = await Website.findOne({
      where: {
        user_id: res.locals.userId
      },
      include: SubmissionFormOptions
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })
    

    if (website) {
      const form = await SubmissionFormOptions.findOne({
        where: {
          website_id: website.uuid
        },
        include: [OptionsAuthor, OptionsTags, OptionsEmail, OptionsSentToOthers, OptionsStoryTitle]
      }).then(res => {
        if (res) {
          return res.dataValues
        }
      })

      await User.update({
        website_id: website.uuid
      }, {
        where: {
          uuid: res.locals.userId
        }
      })
  
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
    }
    res.send(website);
  }

  catch(err) {
    next(err)

  }
})

app.get('/', async (req, res, next) => {
  try {
    const {
      subdomain
    } = req.query;

    const website = await Website.findOne({
      where: {
        subdomain
      }
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })

    const patreon_tier = await User.findOne({
      where: {
        uuid: website.user_id
      },
      attributes: ["patreon_tier"]
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })
    
    res.send({
      website,
      patreon_tier
    });
  }

  catch(err) {
    next(err)

  }
})

app.delete('/delete', authHandler, async (req, res, next) => {
  try {
    const {
      uuid
    } = req.query;

    await Website.destroy({
      where: {
        uuid
      }
    })    
    
    res.send("Site deleted")
  }

  catch(err) {
    next(err)

  }
})


module.exports = app;