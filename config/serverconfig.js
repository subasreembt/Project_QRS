module.exports.ServerPort = 5000;
let ENV = 'DEV';

module.exports.base_url = '';
if (ENV == 'UAT') {
    module.exports.base_url = '';
} else if (ENV == 'PROD') {
    module.exports.base_url = '';
}


// unnoda backend port 5000 la run agum so make the axios calls as 5000 na 8083 potrpen pathuko