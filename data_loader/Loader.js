const DataLoader = require('dataloader');

module.exports = (resolveBatchFunction) => {
    const dataLoader = new DataLoader((ids) => {
        dataLoader.clearAll();
        return resolveBatchFunction(ids);
    });
    return dataLoader;
};
