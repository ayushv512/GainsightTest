import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'nameFilter'
})

@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], value: string): any[] {
        if (value == null) {
            return null;
        }

        return items.filter(singleItem => 
            singleItem.firstname.toLowerCase().includes(value.toLowerCase()) ||
            singleItem.lastname.toLowerCase().includes(value.toLowerCase()) ||
            singleItem.email.toLowerCase().includes(value.toLowerCase()) ||
            singleItem.title.toLowerCase().includes(value.toLowerCase()) ||
            singleItem.location.toLowerCase().includes(value.toLowerCase()) );
    }
}