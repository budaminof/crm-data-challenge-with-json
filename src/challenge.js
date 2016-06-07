const data = require("../data/crm.json");

exports.companies = function ( data ) {
  let newData = data.companies.map( company => {
    return {
      id:company.id,
      name: company.name,
      employees: []
    }
  });

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

exports.employments = function (data) {
  let newData = [];
  for ( var i = 0; i < data.people.length; i++ ) {
    for ( var j = 0; j < data.people[i].employments.length; j++ ) {
      for (var k = 0; k < data.companies.length; k++) {
        if ( data.companies[k].id === data.people[i].employments[j].company_id) {
          newData.push({
            person_id: data.people[i].id,
            person_first_name: data.people[i].first_name,
            person_last_name: data.people[i].last_name,
            company_id: data.people[i].employments[j].company_id,
            title: data.people[i].employments[j].title,
            company_name: data.companies[k].name
          });
        }
      }
    }
  }
  return newData;
}

exports.peopleWithoutEmployments = function (data) {
  let newData = data.people
  .filter( person => !person.employments.length)
  .map( person => {
    return {
      id: person.id,
      first_name: person.first_name,
      last_name: person.last_name
    }
  })
  return newData;
}
