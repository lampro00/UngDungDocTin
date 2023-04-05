"use strict";
class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}
class Setting {
  constructor(category, pageSize, username) {
    this.category = category;
    this.pageSize = pageSize;
    this.username = username;
  }
}
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
