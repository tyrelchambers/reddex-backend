
const filterByUpvotes = ({post, query}) => {
  if (!query.ups) return post

  if (query.ups.operator === "gte") {
    return post.ups >= query.ups.value
  } else if (query.ups.operator === "lte") {
    return post.ups <= query.ups.value
  } else if (query.ups.operator === "eqå"){
    return post.ups == query.ups.value
  }

}

module.exports = filterByUpvotes