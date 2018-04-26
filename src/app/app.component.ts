import { Component, ElementRef, ViewChild, DebugElement } from '@angular/core';
import { Service } from './util/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employeeList : any = [];
  firstName: string = "";
  lastName: string = "";
  email:string = "";
  title: string ="";
  reportingTo:string = "";
  accounts:string = "";
  accountsObj: object= {};
  location:string = "";
  searchValue:string ="";
  isPrimaryCompany: boolean = false;

  titleList: any = [ 'CTO', 'SVP','Director','Manager', 'Software Developer'];
  reportingList: any = [];
  employeeTreeList : any = [];

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('personBtn') personBtn: ElementRef;
  
  constructor(public service: Service){
    this.service.setPredefinedData();
    this.getEmployees();
  }

  
  getEmployees(){
    this.employeeList = this.service.getEmployeeList();
    this.reportingList =[];
    this.employeeTreeList = [];

    this.employeeList.forEach(element => {
      let name = element.firstname + " " + element.lastname;
      this.reportingList.push(name);
    });
    this.employeeList.forEach(element => {
      if(element.title ==="CTO"){
        let ctoname = element.firstname + " " + element.lastname;
        this.employeeTreeList.push({
          name: element.firstname + " " + element.lastname,
          title:element.title,
          reporting: []
        });
        this.employeeList.forEach((element1) => {
          if(element1.reportingTo == ctoname){
            let svpname = element1.firstname + " " + element1.lastname;
            this.employeeTreeList[0].reporting.push({
                name: element1.firstname + " " + element1.lastname,
                title:element1.title,
                reporting: []
            });
            this.employeeList.forEach((element2,directorindex) => { 
              if(element2.reportingTo == svpname){
                this.employeeTreeList[0].reporting[0].reporting.push({
                    name: element2.firstname + " " + element2.lastname,
                    title:element2.title,
                    reporting: []
                });
              }
            });
          }
        });
      }
    });

  }

  onSubmitForm(employeeForm){
    var user = JSON.parse(document.getElementById('addUser').getAttribute('user'));
    if(user !== null){
      localStorage.removeItem(user.lastname.toUpperCase() + user.firstname); 
      document.getElementById('addUser').removeAttribute('user');     
    }
   this.accountsObj = this.service.separateSocialAccounts(employeeForm.value.accounts);
   var userObj = {
    'firstname': this.firstName,
    'lastname': this.lastName,
    'email': this.email,
    'title': this.title,
    'reportingTo': this.reportingTo,
    'social_urls': this.accountsObj,
    'location': this.location,
    'isPrimaryCompany': this.isPrimaryCompany || false
  };
   this.service.storeUser(userObj);
   this.closeBtn.nativeElement.click();
   this.getEmployees();
   employeeForm.reset();
  }
  onAddPersonClick(){
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.title ="";
    this.reportingTo = "";
    this.accounts = "";
    this.location = "";
  }

  onEditRecord(item){
    this.personBtn.nativeElement.click();
    this.firstName = item.firstname;
    this.lastName = item.lastname;
    this.email = item.email;
    this.title = item.title;
    this.reportingTo = item.reportingTo;
    this.accounts = ((item.social_urls.facebook || '') + ';')+ ((item.social_urls.linkedin || '') + ';') + (item.social_urls.twitter || '');
    this.location = item.location;
    document.getElementById('addUser').setAttribute('user',JSON.stringify(item));
  }

  onDeleteRecord(item){
    localStorage.removeItem(item.lastname.toUpperCase() + item.firstname);
    this.getEmployees();
  }
}
