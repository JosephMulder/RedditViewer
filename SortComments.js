function getComments(data) {
    var comments = [];
    var allData = data[1];
    
    for (var i = 0; i < allData.data.children.length; i++) {
        var current = allData.data.children[i];
        var check = current.data.body;
        var author = current.data.author;

        if (check) {
            comments.push([check, author]);
        }
    }

    return comments;
}

module.exports.getComments = getComments;


// function getComments(data) {
//     var comments = [];
//     var allData = data[1];
    
//     for (var i = 0; i < allData.data.children.length; i++) {
//         var current = allData.data.children[i];
//         var check = current.data.body;

//         if (check) {
//             comments += check;

//             for (var j = 0; j < current.data.replies.data.children.length; j++) {

//             }
//         }

//     }

//     return comments;
// }
