const filterBySeries = ({post, query}) => {
  if (query.seriesOnly) {
    return post.link_flair_text === "Series"
  } 
  
  if (query.omitSeries) {
    return post.link_flair_text !== "Series"
  }

  return post
}

module.exports = filterBySeries