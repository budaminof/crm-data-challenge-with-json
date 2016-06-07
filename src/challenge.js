const data = require("../data/crm.json");

function employeesOfCompanies ( data ) {
  let newData = [];

  for ( let i = 0; i < data.companies.length; i++ ) {
    newData.push({
      id:data.companies[i].id,
      name: data.companies[i].name,
      employees: []
    })
  }

  for ( let i = 0; i < data.people.length; i++ ) {
    for ( let j = 0; j < data.people[i].employments.length; j++ ) {
      for ( let k = 0; k < newData.length; k++ ) {
        if( newData[k].id == data.people[i].employments[j].company_id ) {
          newData[k].employees.push({
            id: data.people[i].id,
            first_name: data.people[i].first_name,
            last_name: data.people[i].last_name,
            title: data.people[i].employments[j].title
           })
        }
      }
    }
  }

  for ( var i = 0; i < newData.length; i++ ) {
    delete newData[i].id
  }
  return newData;
};


function allEmployments (data) {
  let newData = [];
  for ( var i = 0; i < data.people.length; i++ ) {
    for ( var j = 0; j < data.people[i].employments.length; j++ ) {
      newData.push({
        person_id: data.people[i].id,
        person_first_name: data.people[i].first_name,
        person_last_name: data.people[i].last_name,
        company_id: data.people[i].employments[j].company_id,
        title: data.people[i].employments[j].title
      });
    }
  }
  for ( let k = 0; k < data.companies.length; k++ ) {
    for ( let i = 0; i < newData.length; i++ ) {
      if ( newData[i].company_id === data.companies[k].id ) {
        newData[i].company_name = data.companies[k].name;
      }
    }

  }
  return newData;
}

function peopleWithoutEmployments (data) {
  let newData = [];
  for ( var i = 0; i < data.people.length; i++ ) {
    if ( data.people[i].employments.length === 0 ) {
      newData.push({
        id: data.people[i].id,
        first_name: data.people[i].first_name,
        last_name: data.people[i].last_name
      })
    }
  }
  return newData
}

employeesOfCompanies(data);
allEmployments(data);
peopleWithoutEmployments(data);

// module.exports = function (data) {
//   return changeData(data)
// }
