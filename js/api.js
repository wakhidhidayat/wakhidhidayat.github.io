const api_token = '5bf517741bb5452c89095b686b1fa898'
const league_code = 2002
const base_url = "https://api.football-data.org/v2/";
const endpoint_teams = `${base_url}teams/`
const endpoint_standings = `${base_url}competitions/${league_code}/standings?standingType=TOTAL`

const fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_token
    }
  });
}

// will called if fetch successfuly done
const status = (response) => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // will called if any error occur
    return Promise.reject(new Error(response.statusText));
  } else {
    // object to promise
    return Promise.resolve(response);
  }
}

// parsing json to array
const json = (response) => {
  return response.json();
}

const error = (error) => {
  // error paramter from catch block
  console.log("Error : " + error);
}

const getStandings = () => {
  if ('caches' in window) {
    caches.match(endpoint_standings)
      .then(response => {
        if (response) {
          response.json()
            .then(data => {
              resultKlasemenJSON(data);
            });
        }
      });
  }

  fetchApi(endpoint_standings)
    .then(status)
    .then(json)
    .then(data => {
      resultKlasemenJSON(data)
    })
    .catch(error);
}

const getDetailTeam = () => {
  return new Promise((resolve, reject) => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(endpoint_teams + idParam)
      .then(response => {
        if (response) {
          response.json()
          .then(data => {
            resultDetailTimJSON(data)
            // send object data
            resolve(data);
          });
        }
      });
    }

    fetchApi(endpoint_teams + idParam)
      .then(status)
      .then(json)
      .then(data => {
        resultDetailTimJSON(data)
        dataTeamJSON = data;
        // send object data
        resolve(data);
      })
      .catch(error);
  });
}