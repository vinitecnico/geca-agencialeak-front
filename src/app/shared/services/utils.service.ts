import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class UtilsService {

    removeSpecialCharacters(value: string) {
        return value.replace(/[&\/\\#,+()$~%'":*?<>{}|]/g, '');
    }

    onlyNumbers(value: string) {
        return value.replace(/\D/g, '');
    }

    inputMask(type: string) {
        switch (type) {
            case 'phone':
                return ['+', '5', '5', ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-',
                    /\d/, /\d/, /\d/, /\d/];
            case 'mobile':
                return ['+', '5', '5', ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/,
                    '-', /\d/, /\d/, /\d/, /\d/];
            case 'cpf':
                return [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/,
                    /[0-9]/, '-', /[0-9]/, /[0-9]/];
            case 'cnpj':
                return [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.',
                    /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/,
                    /[0-9]/];
            case 'date':
                return [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
        }
    }
}
