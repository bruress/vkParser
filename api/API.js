class API {
    // API settings 
    constructor (config) { 
        if (new.target === API) { // prohibition on create API 
            throw new Error("Cannot create API");
        }
        this.config = config;
    }

    // initialize API
    async initialize () {
        throw new Error("initialize() must be implemented");
    }

    // req and get data
    async fetchData(query) {
        throw new Error("fetchData() must be implemented");
    }
};

export default API;