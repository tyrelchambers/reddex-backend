  const filterByKeywords = ({post, query}) => {
  if (!query.keywords) return post;

  if (query.keywords) {
    return post.author.includes(keywords) || post.self_text.includes(keywords) || post.title.includes(keywords)
  }
}

module.exports = filterByKeywords