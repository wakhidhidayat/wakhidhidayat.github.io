const cekData = (storeName, id) => {
    return new Promise((resolve, reject) => {
        databasePromise(idb)
            .then((db) => {
                let tx = db.transaction(storeName, "readonly");
                let store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then((data) => {
                if (data != undefined) {
                    resolve("favorite team");
                } else {
                    reject("not favorite team");
                }
            })
            .catch(err => {
                console.log(err);
            });
    });
}

const deleteDatafav = (storeName, data) => {
    databasePromise(idb)
        .then((db) => {
            let tx = db.transaction(storeName, 'readwrite');
            let store = tx.objectStore(storeName);
            store.delete(data);
            return tx.complete;
        }).then(() => {
            document.getElementById("iconFav").innerHTML = "favorite_border";
            M.toast({
                html: 'Successfully deleted from favorite!'
            });
        }).catch(err => {
            console.log(err);
            M.toast({
                html: 'Something wrong...'
            });
        });
}

const createDataFav = (dataType, data) => {
    let storeName = "";
    let dataToCreate = {}
    if (dataType == "tim") {
        storeName = "tim_favorit"
        dataToCreate = {
            id: data.id,
            name: data.name,
            shortName: data.shortName,
            tla: data.tla,
            crestUrl: data.crestUrl,
            address: data.address,
            phone: data.phone,
            website: data.website,
            email: data.email,
            founded: data.founded,
            clubColors: data.clubColors,
            venue: data.venue,
            squad: data.squad
        }
    }

    databasePromise(idb)
        .then(db => {
            let tx = db.transaction(storeName, 'readwrite');
            tx.objectStore(storeName).put(dataToCreate);

            return tx.complete;
        }).then(() => {
            document.getElementById("iconFav").innerHTML = "favorite";
            M.toast({
                html: 'Successfully added to favorite!'
            });
        }).catch(() => {
            M.toast({
                html: 'Something wrong...'
            });
        });
}

const getSavedDataById = (dataType) => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = Number(urlParams.get("id"));

    if (dataType == "tim") {
        getDataById("tim_favorit", idParam)
            .then(tim => {
                resultDetailTimJSON(tim)
                dataTeamJSON = tim;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

const getDataById = (storeName, id) => {
    return new Promise((resolve, reject) => {
        databasePromise(idb)
            .then(db => {
                let tx = db.transaction(storeName, "readonly");
                let store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                console.log(err);
            })
    });
}

const getAllData = (storeName) => {
    return new Promise((resolve, reject) => {
        databasePromise(idb)
            .then(db => {
                let tx = db.transaction(storeName, "readonly");
                let store = tx.objectStore(storeName);
                return store.getAll();
            })
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                console.log(err);
            });
    });
}

const setupDataFavHtml = (dataType) => {

    if (dataType == "tim") {
        getAllData("tim_favorit")
            .then(data => {
                resultTeamFav(data);
            })
            .catch(err => {
                console.log(err);
            });
    }
}