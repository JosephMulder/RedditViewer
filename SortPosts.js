function SortPosts(data) {
    var result = [];

    for (var i = 0; i < data.length; i++) {
        if (!data[i].data.over_18) {
           result.push(data[i]) ;
        }
    }
    return result;
}


module.exports.SortPosts = SortPosts;
