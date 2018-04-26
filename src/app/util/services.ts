import { Injectable } from "@angular/core";


@Injectable()
export class Service {
    storeUser(values){
        let key;
        key = values.lastname.toUpperCase() + values.firstname;
        localStorage.setItem(key, JSON.stringify(values));
    }

    getEmployeeList(){
        var employees = [];
        for (var i = 0; i < localStorage.length; i++) {
            var value = localStorage.getItem(localStorage.key(i));
                var obj = JSON.parse(value);
                employees.push(obj);
        }
        return employees;
    }

    separateSocialAccounts(social_urls) {
        var socialUrlObj = {};
        var regex = {
            "facebook":/(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/,
            "linkedin":/((http(s?):\/\/)*([a-zA-Z0-9\-])*\.|[linkedin])[linkedin/~\-]+\.[a-zA-Z0-9/~\-_,&=\?\.;]+[^\.,\s<]/,
            "twitter":/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
        }
        if ('undefined' !== typeof social_urls) {
            var socialUrlsArray = social_urls.split(';');
            socialUrlsArray.forEach(function (social_url) {
                if (social_url.match(regex.facebook)) {
                    socialUrlObj['facebook'] = social_url;
                } else if (social_url.match(regex.linkedin)) {
                    socialUrlObj['linkedin'] = social_url;
                } else if (social_url.match(regex.twitter)) {
                    socialUrlObj['twitter'] = social_url;
                }
            });
        }
        return socialUrlObj;
    }
    setPredefinedData(){
        var social_urls = this.separateSocialAccounts('https://www.facebook.com/ayushverma512;https://www.linkedin.com/in/ayush-verma/;https://twitter.com/ayushv512');
        var employee1 = {
            'firstname': 'Ayush',
            'lastname': 'Verma',
            'email': 'ayu.verma12@gmail.com',
            'title': 'CTO',
            'reportingTo':" ",
            'social_urls': social_urls,
            'location': 'BTM Bengaluru',
            'isPrimaryCompany': true
        };
        social_urls = this.separateSocialAccounts('https://www.linkedin.com/in/ayush-verma/');
        var employee2 = {
            'firstname': 'Ashish',
            'lastname': 'Sharma',
            'email': 'ashish.sharma@gmail.com',
            'title': 'SVP',
            "reportingTo":"Ayush Verma",
            'social_urls': social_urls,
            'location': 'HSR Bengaluru',
            'isPrimaryCompany': false
        };
        social_urls = this.separateSocialAccounts('https://www.linkedin.com/in/surajPasayat/;https://www.facebook.com/suraj.pasayat;https://twitter.com/abzurb;');
        var employee3 = {
            'firstname': 'Suraj',
            'lastname': 'Pasayat',
            'email': 'suraj.93p@gmail.com',
            'title': 'SVP',
            "reportingTo":"Ayush Verma",
            'social_urls': social_urls,
            'location': 'Belanduru',
            'isPrimaryCompany': false
        };
        social_urls = this.separateSocialAccounts('https://www.facebook.com/ayushverma512');
        var employee4 = {
            'firstname': 'Anjali',
            'lastname': 'Jain',
            'email': 'anjali.jain@gmail.com',
            'title': 'Director',
            "reportingTo":"Ashish Sharma",
            'social_urls': social_urls,
            'location': 'Whitefield Bengaluru',
            'isPrimaryCompany': false
        };
        social_urls = this.separateSocialAccounts('https://twitter.com/abzurb;');
        var employee5 = {
            'firstname': 'Akash',
            'lastname': 'Gupta',
            'email': 'akash.gupta@gmail.com',
            'title': 'Director',
            "reportingTo":"Ashish Sharma",
            'social_urls': social_urls,
            'location': 'Delhi',
            'isPrimaryCompany': false
        };
        this.storeUser(employee1);
        this.storeUser(employee2);
        this.storeUser(employee3);
        this.storeUser(employee4);
        this.storeUser(employee5);
    }
            
      
}