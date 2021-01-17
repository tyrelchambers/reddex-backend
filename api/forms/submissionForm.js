const express = require("express");
const emailCon = require("../../libs/emailConfig");
const { authHandler } = require("../../middleware/middleware.js");
const db = require("../../models");

const app = express.Router();

app.post("/submit", async (req, res, next) => {
  try {
    const story_email = req.sanitize(req.body.OptionsEmail.value);
    const author = req.sanitize(req.body.OptionsAuthor.value);
    const tags = req.sanitize(req.body.OptionsTag.value);
    const sent_to_others = req.body.OptionsSentToOther;
    const website = req.sanitize(req.body.website_id);
    const story_title = req.sanitize(req.body.OptionsStoryTitle.value);
    const body = req.sanitize(req.body.body);

    const sent_to_others_formatted =
      sent_to_others.value === null ? false : sent_to_others.value;

    const subdomain = await db.models.website.findOne({
      where: {
        uuid: website,
      },
      include: "User",
    });

    await db.models.submitted_stories.create({
      email: story_email,
      author,
      tags,
      sent_to_others: sent_to_others_formatted,
      story_title,
      body,
      user_id: subdomain.User.uuid,
    });

    emailCon
      .send({
        template: "mars",
        message: {
          to: subdomain.User.email,
        },

        locals: {
          email: story_email,
          story_title,
          author,
          body,
          sent_to_others,
        },
      })
      .then()
      .catch(console.error);

    res.status(200).json({ message: "Your story has been sent, thank you!" });
  } catch (error) {
    next(error);
  }
});

app.put("/save", authHandler, async (req, res, next) => {
  try {
    const {
      enabled,
      options_author: author,
      options_email: email,
      options_sent_to_others: sent_to_others,
      options_tags: tags,
      options_story_title: story_title,
      options_id,
      website,
    } = req.body;

    await db.models.submission_form_options
      .update(
        {
          enabled,
        },
        {
          where: {
            website_id: website,
          },
        }
      )
      .then((res) => {
        if (res) {
          return res.dataValues;
        }
      });

    await db.models[options_author].update(
      {
        value: author.value,
        label: author.label,
        required: author.required,
        enabled: author.enabled,
        options_id,
      },
      {
        where: {
          options_id,
        },
      }
    );

    await db.models[options_email].update(
      {
        value: email.value,
        label: email.label,
        required: email.required,
        enabled: email.enabled,
        options_id,
      },
      {
        where: {
          options_id,
        },
      }
    );

    await db.mdoels[options_sent_to_others].update(
      {
        value: sent_to_others.value,
        label: sent_to_others.label,
        required: sent_to_others.required,
        enabled: sent_to_others.enabled,
        options_id,
      },
      {
        where: {
          options_id,
        },
      }
    );

    await db.models[options_tags].update(
      {
        value: tags.value,
        label: tags.label,
        required: tags.required,
        enabled: tags.enabled,
        options_id,
      },
      {
        where: {
          options_id,
        },
      }
    );

    await db.models[options_story_title].update(
      {
        value: story_title.value,
        label: story_title.label,
        required: story_title.required,
        enabled: story_title.enabled,
        options_id,
      },
      {
        where: {
          options_id,
        },
      }
    );

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.get("/", async (req, res, next) => {
  try {
    const { sid } = req.query;

    const form = await db.models.submission_form_options
      .findOne({
        where: {
          website_id: sid,
        },
        include: [
          options_author,
          options_tags,
          options_email,
          options_sent_to_others,
          options_story_title,
        ],
      })
      .then((res) => {
        if (res) {
          return res.dataValues;
        }
      });

    if (
      !form.options_author ||
      !form.options_email ||
      !form.options_tags ||
      !form.options_story_title ||
      !form.options_sent_to_others
    ) {
      await db.models.options_author.findOrCreate({
        where: {
          options_id: form.uuid,
        },
      });
      await db.models.options_email.findOrCreate({
        where: {
          options_id: form.uuid,
        },
      });
      await db.models.options_sent_to_others.findOrCreate({
        where: {
          options_id: form.uuid,
        },
      });
      await db.models.options_tags.findOrCreate({
        where: {
          options_id: form.uuid,
        },
      });
      await db.models.options_story_title.findOrCreate({
        where: {
          options_id: form.uuid,
        },
      });
    }

    const formRefetched = await db.models.submission_form_options
      .findOne({
        where: {
          website_id: sid,
        },
        include: [
          options_author,
          options_tags,
          options_email,
          options_sent_to_others,
          options_story_title,
        ],
      })
      .then((res) => {
        if (res) {
          return res.dataValues;
        }
      });

    res.send(formRefetched);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
