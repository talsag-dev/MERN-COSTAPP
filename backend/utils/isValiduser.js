const isValidUserID = (userId, fn) => {
  // User.find({userID: userID}, function (err, docs){
  //     fn(docs)
  // });
  User.findOne({ userId: userId }, function (err, user) {
    fn(user);
  });
}


module.exports = { isValidUserID };
