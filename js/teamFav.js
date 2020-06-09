function resultTeamFav(data) {

    let dataTeamFavHtml = '';
    
    data.forEach(team => {
    
        dataTeamFavHtml += `
    <div class="col s12 m6 l6">
      <div class="card">
    
      <div class="card-content">
      <div center-align>
          <h5 class="center-align">
           <span class="blue-text text-darken-2">  
           <a href="./detailtim.html?id=${team.id}">
           <img src=${team.crestUrl}  alt="logo club" style="float:center;width:50px;height:50px;"> <br/> <br/>
           ${team.name}
           </a>
           </span>
          </h5>          
      </div>
      </div>
      </div>
    </div>
        `
    });

    document.getElementById("divFavorit").innerHTML = dataTeamFavHtml;
}