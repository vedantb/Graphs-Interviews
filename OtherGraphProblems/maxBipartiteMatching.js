// given a list of applicants applying for jobs, match the maximum number of
// applicants to jobs and return the number of matches possible

function findMaxMatching(jobApplications, allJobs) {
  let match = {};
  let maxMatch = 0;
  for (let candidate in jobApplications) {
    console.log(candidate);
    let jobSeen = new Set();
    maxMatch += matchJobs(candidate, jobApplications, match, jobSeen) ? 1 : 0;
  }
  return maxMatch;
}

function matchJobs(candidate, jobApplications, match, jobSeen) {
  for (let job of jobApplications[candidate]) {
    if (jobSeen.has(job)) continue;
    jobSeen.add(job);
    if (!(job in match)) {
      match[job] = candidate;
      return true;
    }
    let flag = matchJobs(match[job], jobApplications, match, jobSeen);
    if (flag) {
      match[job] = candidate;
      return true;
    }
  }
  return false;
}

let app0 = [10, 11, 13];
let app1 = [10];
let app2 = [12];
let app3 = [12, 10, 11];

let jobApplications = {
  0: app0,
  1: app1,
  2: app2,
  3: app3
};
let allJobs = [10, 11, 12, 13];
console.log(findMaxMatching(jobApplications, allJobs));
