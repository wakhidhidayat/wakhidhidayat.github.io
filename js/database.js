const databasePromise = (idb) => {
    const dbPromise = idb.open("pwasepakbola", 1, (upgradeDb) => {
        if (!upgradeDb.objectStoreNames.contains("tim_favorit")) {
            let indexTimFav = upgradeDb.createObjectStore("tim_favorit", {
                keyPath: "id"
            });
            indexTimFav.createIndex("namaTim", "name", {
                unique: false
            });
        }
    });

    return dbPromise;
}