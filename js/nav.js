document.addEventListener("DOMContentLoaded", () => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

    loadNav();

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
                    elm.addEventListener("click", function (event) {
                        // Tutup sidenav
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        //console.log("cek halaman yang dimuat: loadNav: " + page);

                        loadPage(setupPage(page));

                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    // Load page content
    let page = window.location.hash.substr(1);


    loadPage(setupPage(page));

    function setupPage(page) {
        if (page == "" || page == "#") {
            page = "home";
        } else if (page === "favorit") {
            page = "favorit";
        }
        return page;
    }

    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            const content = document.querySelector("#body-content");

            if (this.readyState == 4) {
                if (page === "home") {
                    getStandings();
                } else {
                    setupDataFavHtml("tim");
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else {
                    content.innerHTML = "<p>404 Not Found.</p>";
                }
            }
        };

        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }

});