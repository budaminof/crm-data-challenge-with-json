const data = require("../data/crm.json");

exports.companies = function ( data ) {
  let result = [];

  for (let i = 0; i < data.companies.length; i++) {
    result.push({
      id: data.companies[i].id,
      name: data.companies[i].name,
      employees: []
    })
  }

  for (let b = 0; b < data.people.length; b++) {
    for (let k = 0; k < data.people[b].employments.length; k++) {
      for (let j = 0; j < result.length; j++) {
        if(result[j].id == data.people[b].employments[k].company_id) {
          result[j].employees.push({
            id: data.people[b].id,
            first_name: data.people[b].first_name,
            last_name: data.people[b].last_name,
            title: data.people[b].employments[k].title
          })
        }
      }
    }
  }

  for (let i = 0; i < result.length; i++) {
    delete result[i].id;
  }

  return result;
}

exports.employments = function ( data ) {
  let result= [];

  for (let i = 0; i < data.people.length; i++) {
    for (let j = 0; j < data.people[i].employments.length; j++) {
      for (var k = 0; k < data.companies.length; k++) {
        if ( data.people[i].employments[j].company_id == data.companies[k].id ) {
          result.push({
            company_id: data.people[i].employments[j].company_id,
            company_name: data.companies[k].name,
            person_id: data.people[i].id,
            person_first_name: data.people[i].first_name,
            person_last_name: data.people[i].last_name,
            title: data.people[i].employments[j].title
          })
        }
      }
    }
  }

  return result;
}

exports.peopleWithoutEmployments = function ( data ) {
  let result = [];

  for (let i = 0; i < data.people.length; i++) {
    if( !data.people[i].employments.length ) {
      result.push({
        id: data.people[i].id,
        first_name: data.people[i].first_name,
        last_name: data.people[i].last_name
      })
    }
  }

  return result;
}
