'use strict';
import faker from 'faker'
import jsf from 'json-schema-faker';

jsf.locate('faker');

const sampleJSON = {"is_employee":false,"seen_layout_switch":true,"has_visited_new_profile":true,"pref_no_profanity":true,"has_external_account":false,"pref_geopopular":"GLOBAL","seen_redesign_modal":true,"pref_show_trending":true,"subreddit":{"default_set":true,"user_is_contributor":false,"banner_img":"https://styles.redditmedia.com/t5_77cio/styles/profileBanner_viysfhqpm6231.jpg?width=1280&amp;height=384&amp;crop=1280:384,smart&amp;s=178423f89489c0576c746437a33d5f071706f771","restrict_posting":true,"user_is_banned":false,"free_form_reports":true,"community_icon":"","show_media":true,"icon_color":"","user_is_muted":false,"display_name":"u_StoriesAfterMidnight","header_img":null,"title":"Stories After Midnight","coins":0,"over_18":false,"icon_size":[256,256],"primary_color":"","icon_img":"https://styles.redditmedia.com/t5_77cio/styles/profileIcon_85zjdjaom6231.jpg?width=256&amp;height=256&amp;crop=256:256,smart&amp;s=59e74f1a25336252d821df3ea2dac4bb7186b0dd","description":"","submit_link_label":"","header_size":null,"restrict_commenting":false,"subscribers":3,"submit_text_label":"","is_default_icon":false,"link_flair_position":"","display_name_prefixed":"u/StoriesAfterMidnight","key_color":"","name":"t5_77cio","is_default_banner":false,"url":"/user/StoriesAfterMidnight/","banner_size":[1280,384],"user_is_moderator":true,"public_description":"Just a narrator trying to give you a good spook","link_flair_enabled":false,"disable_contributor_requests":false,"subreddit_type":"user","user_is_subscriber":false},"is_sponsor":false,"gold_expiration":null,"has_gold_subscription":false,"num_friends":1,"features":{"mweb_xpromo_revamp_v2":{"owner":"growth","variant":"treatment_4","experiment_id":457},"chat_subreddit":true,"show_amp_link":true,"top_content_email_digest_v2":{"owner":"growth","variant":"treatment","experiment_id":363},"twitter_embed":true,"is_email_permission_required":true,"mod_awards":true,"expensive_coins_package":true,"promoted_trend_blanks":true,"awards_on_streams":true,"mweb_xpromo_modal_listing_click_daily_dismissible_ios":true,"community_awards":true,"modlog_copyright_removal":true,"do_not_track":true,"chat_user_settings":true,"mweb_xpromo_interstitial_comments_ios":true,"premium_subscriptions_table":true,"mweb_xpromo_interstitial_comments_android":true,"delete_vod_when_post_is_deleted":true,"mweb_sharing_web_share_api":{"owner":"growth","variant":"control_1","experiment_id":314},"chat_group_rollout":true,"custom_feeds":true,"spez_modal":true,"mweb_xpromo_modal_listing_click_daily_dismissible_android":true},"has_android_subscription":false,"verified":true,"new_modmail_exists":null,"pref_autoplay":true,"coins":0,"has_paypal_subscription":false,"has_subscribed_to_premium":false,"id":"2dflzqc","has_stripe_subscription":false,"seen_premium_adblock_modal":false,"can_create_subreddit":true,"over_18":true,"is_gold":false,"is_mod":false,"suspension_expiration_utc":null,"has_verified_email":true,"is_suspended":false,"pref_video_autoplay":true,"in_redesign_beta":true,"icon_img":"https://styles.redditmedia.com/t5_77cio/styles/profileIcon_85zjdjaom6231.jpg?width=256&amp;height=256&amp;crop=256:256,smart&amp;s=59e74f1a25336252d821df3ea2dac4bb7186b0dd","has_mod_mail":false,"pref_nightmode":false,"oauth_client_id":"WPWj7m-iKvTLdQ","hide_from_robots":false,"link_karma":34,"force_password_reset":false,"seen_give_award_tooltip":false,"inbox_count":0,"pref_top_karma_subreddits":true,"has_mail":false,"pref_show_snoovatar":false,"name":"StoriesAfterMidnight","pref_clickgadget":5,"created":1504749757,"gold_creddits":0,"created_utc":1504720957,"has_ios_subscription":false,"pref_show_twitter":false,"in_beta":false,"comment_karma":3476,"has_subscribed":true,"seen_subreddit_chat_ftux":false}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [{
      email: faker.internet.email,
      password: faker.internet.password,
      access_token: faker.random.alphaNumeric,
      refresh_token: faker.random.alphaNumeric,
      initial_message: faker.lorem.sentence,
      repeat_message: faker.lorem.sentence,
      reddit_profile: sampleJSON
    }, {
      email: faker.internet.email,
      password: faker.internet.password,
      access_token: faker.random.alphaNumeric,
      refresh_token: faker.random.alphaNumeric,
      initial_message: faker.lorem.sentence,
      repeat_message: faker.lorem.sentence,
      reddit_profile: sampleJSON
    }], {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("User", null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
