const { DataTypes, Deferrable } = require("sequelize");
const sequelize = require("../index.js");

const User = require("./User.js");
const Story = require("./Story.js");

// Determines whether or not a story has been used. This shows as a green checkmark on SubredditPost. Used to show that the author has already been messaged about that particular story.

const StoriesUsed = sequelize.define(
  "StoriesUsed",
  {
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "uuid",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    post_id: {
      type: DataTypes.UUID,
      references: {
        model: Story,
        key: "uuid",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  },
  {
    tableName: "stories_used",
    timestamps: false,
  }
);

module.exports = StoriesUsed;
