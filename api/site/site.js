const express = require("express");
const { authHandler } = require("../../middleware/middleware");
const db = require("../../models");

const app = express.Router();

app.post("/activate", authHandler, async (req, res, next) => {
  try {
    const website = await db.models.website
      .create(
        {
          user_id: res.locals.userId,
        },
        {
          returning: true,
        }
      )
      .then((res) => res.dataValues);

    await db.models.user.update(
      {
        website_id: website.uuid,
      },
      {
        where: {
          uuid: res.locals.userId,
        },
      }
    );

    const options = await db.models.submission_form_options
      .create(
        {
          website_id: website.uuid,
        },
        {
          returning: true,
        }
      )
      .then((res) => res.dataValues);

    await db.models.options_author.create({
      options_id: options.uuid,
    });
    await db.models.options_email.create({
      options_id: options.uuid,
    });
    await db.models.options_sent_to_others.create({
      options_id: options.uuid,
    });
    await db.models.options_tags.create({
      options_id: options.uuid,
    });
    await db.models.options_story_title.create({
      options_id: options.uuid,
    });

    res.send({
      website,
      options,
    });
  } catch (err) {
    next(err);
  }
});

app.post("/update", authHandler, async (req, res, next) => {
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
    const headline = req.sanitize(req.body.headline);
    const submission_title = req.sanitize(req.body.submission_title);
    const rules = req.sanitize(req.body.rules);
    const thumbnail = req.body.thumbnail;

    const website = await db.models.website
      .update(
        {
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
          thumbnail,
        },
        {
          where: {
            user_id: res.locals.userId,
          },
          returning: true,
          plain: true,
        }
      )
      .then((res) => res[1].dataValues);

    res.send(website);
  } catch (err) {
    next(err);
  }
});

app.get("/config", authHandler, async (req, res, next) => {
  try {
    const website = await db.models.website
      .findOne({
        where: {
          user_id: res.locals.userId,
        },
        include: submission_form_options,
      })
      .then((res) => {
        if (res) {
          return res.dataValues;
        }
      });

    if (website) {
      const form = await db.models.submission_form_options
        .findOne({
          where: {
            website_id: website.uuid,
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

      await db.models.user.update(
        {
          website_id: website.uuid,
        },
        {
          where: {
            uuid: res.locals.userId,
          },
        }
      );

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
    }
    res.send(website);
  } catch (err) {
    next(err);
  }
});

app.get("/", async (req, res, next) => {
  try {
    const { subdomain } = req.query;

    const website = await db.models.website
      .findOne({
        where: {
          subdomain,
        },
      })
      .then((res) => {
        if (res) {
          return res.dataValues;
        }
      });

    const patreon_tier = await db.models.user
      .findOne({
        where: {
          uuid: website.user_id,
        },
        attributes: ["patreon_tier"],
      })
      .then((res) => {
        if (res) {
          return res.dataValues;
        }
      });

    res.send({
      website,
      patreon_tier,
    });
  } catch (err) {
    next(err);
  }
});

app.delete("/delete", authHandler, async (req, res, next) => {
  try {
    const { uuid } = req.query;

    await db.models.website.destroy({
      where: {
        uuid,
      },
    });

    res.send("Site deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = app;
