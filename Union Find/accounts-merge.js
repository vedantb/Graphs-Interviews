// https://leetcode.com/problems/accounts-merge/

/**
 * Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0]
 * is a name, and the rest of the elements are emails representing emails of the account.
 *
 * Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email
 * to both accounts. Note that even if two accounts have the same name, they may belong to different people as people
 * could have the same name. A person can have any number of accounts initially, but all of their accounts
 * definitely have the same name.
 *
 * After merging the accounts, return the accounts in the following format: the first element of each account is the name,
 * and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.
 */

const UnionFind = require("./union-find");

/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  let uf = new UnionFind(accounts.length);
  let owners = {};
  for (let i = 0; i < accounts.length; i++) {
    for (let j = 1; j < accounts[i].length; j++) {
      let email = accounts[i][j];
      if (email in owners) {
        let person = owners[email];
        uf.unify(person, i);
      } else {
        owners[email] = i;
      }
    }
  }

  let users = {};
  for (let i = 0; i < accounts.length; i++) {
    let parent = uf.find(i);
    let emails = accounts[i].slice(1) || [];
    users[parent] = users[parent] || new Set();
    emails.forEach((email) => users[parent].add(email));
  }

  let res = [];
  for (let idx in users) {
    let name = accounts[idx][0];
    let emails = Array.from(users[idx]);
    emails = emails.sort();
    emails.unshift(name);
    res.push(emails);
  }
  return res;
};

console.log(
  accountsMerge([
    ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
    ["John", "johnsmith@mail.com", "john00@mail.com"],
    ["Mary", "mary@mail.com"],
    ["John", "johnnybravo@mail.com"]
  ])
);
