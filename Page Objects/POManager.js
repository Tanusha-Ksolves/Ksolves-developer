const {ContactUsPage} = require('./ContactUsPage');
const {CareersPage} = require('./CareersPage');
const {StartProjectPage} = require('./StartProjectPage');

class POManager{
    constructor(page){
        this.page = page;
        this.contactUsPage = new ContactUsPage(this.page);
        this.careersPage = new CareersPage(this.page);
        this.startProjectPage = new StartProjectPage(this.page);

    }


    getContactUsPage(){
        return this.contactUsPage;
    }

    getCareersPage(){
        return this.careersPage;
    }

    getStartProjectpage(){
        return this.startProjectPage;
    }
}

module.exports = {POManager};