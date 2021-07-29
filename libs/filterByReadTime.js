const filterByReadTime = ({post, query}) => {
  if (!query.readTime) return post;

  if (query.readTime.operator === "gte") {
    return post.readTime >= query.readTime.value
  } else if(query.readTime.operator === "lte") {
    return post.readTime <= query.readTime.value
  } else {
    return post
  }
}

module.exports = filterByReadTime