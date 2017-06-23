const users = [{
  id: 1,
  name: 'Nikita',
  schoolId: 101
},
{
  id: 2,
  name: 'Pavel',
  schoolId: 999
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 89
},
{
  id: 2,
  schoolId: 999,
  grade: 100
},
{
  id: 3,
  schoolId: 101,
  grade: 80
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => {
      return user.id === id; //искать у кого совпадает id
    });

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}.`);
    }
  });
}

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => {
      return grade.schoolId === schoolId;
    }));
  });
};

// Nikita has a 85 % in the class
const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;

    if (grades.length > 0) {
      average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has a ${average}% in the class.`;
  });
};

const getStatusAlt = async (userId) => {
  // throw new Error('This is an error'); //reject
  // return 'Nikita'; //resolve
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let average = 0;

  if (grades.length > 0) {
    average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
  }

  return `${user.name} has a ${average}% in the class.`;
};

//Async возвращает только Promises

getStatusAlt(1).then((name) => {
  console.log(name);
}).catch((e) => {
  console.log(e);
});

// getUser(1).then((user) => {
//   console.log(user);
// }).catch((e) => {
//   console.log(e);
// });

// getStatus(1).then((status) => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// });
