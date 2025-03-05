const {ContactUsPage} = require('./ContactUsPage');
const {CareersPage} = require('./CareersPage');
const {StartProjectPage} = require('./StartProjectPage');
const  {ApplyNowPage} = require('./ApplyNowPage');

class POManager{
    constructor(page){
        this.page = page;
        this.contactUsPage = new ContactUsPage(this.page);
        this.careersPage = new CareersPage(this.page);
        this.startProjectPage = new StartProjectPage(this.page);
        this.applyNowPage = new ApplyNowPage(this.page);

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

    getApplyNowPage(){
        return this.applyNowPage;
    }
}

module.exports = {POManager};