//hw 8//
//user object//
function User(username) {
  (this.username = username),
    (this.follower = []), //מי שעוקב אחריי//
    (this.addFollower = function (newFollower) {
      this.follower.push(newFollower);
      newFollower.following.push(this);
    });
  (this.following = []), //מי שאני עוקב אחריו//
    (this.addFollowing = function (newFollowing) {
      this.following.push(newFollowing);
      newFollowing.follower.push(this);
    });
  this.inbox = [];
  this.sendMessage = function (message) {
    this.follower.forEach((followerUser) => {
      followerUser.inbox.push(this.username + " says: " + message);
    });
  };
  this.watchMessage = function () {
    if (this.inbox.length == 0) {
      document.getElementById("messagesReading").innerHTML = "no new messages";
    } else {
      document.getElementById("messagesReading").innerHTML = this.inbox;
      this.inbox = [];
    }
  };
}
let userslist = [];
function createUser() {
  let uName = document.getElementById("username").value;
  let newuser = "user" + (userslist.length + 1);
  eval(newuser + "= new User(uName)");
  userslist.push(" " + newuser + ": " + uName);
  console.log(userslist); //מדפיס מערך משתמשים//
  console.log(eval(newuser)); //מדפיס מערך של אובייקטים//
  document.getElementById("appUsersP").innerHTML = userslist;
}
function createRelation() {
  let userOne = document.getElementById("firstUser").value;
  let userTwo = document.getElementById("secondUser").value;
  let usersAction = document.getElementById("action").value;
  if (usersAction == "Follow") {
    eval(userOne).addFollowing(eval(userTwo));
    alert(userOne + " now follow " + userTwo);
    console.log(eval(userOne));
    console.log(eval(userTwo));
  } else {
    eval(userOne).addFollower(eval(userTwo));
    alert(userOne + " now being followed by " + userTwo);
    console.log(eval(userOne));
    console.log(eval(userTwo));
  }
}
function messageSending() {
  let sendingUser = document.getElementById("sender").value;
  let messageTxt = document.getElementById("message").value;
  eval(sendingUser).sendMessage(messageTxt);
}
function messageReading() {
  let readingUser = document.getElementById("reader").value;
  eval(readingUser).watchMessage();
}
document.getElementById("addUserBtn").addEventListener("click", createUser);
document.getElementById("sendBtn").addEventListener("click", messageSending);
document.getElementById("readBtn").addEventListener("click", messageReading);
document.getElementById("relBtn").addEventListener("click", createRelation);