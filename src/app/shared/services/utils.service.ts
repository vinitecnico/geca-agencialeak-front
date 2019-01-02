import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class UtilsService {
    setParameters(parameters: any): HttpParams {
        if (parameters) {
            let Params = new HttpParams();
            _.each(parameters, (value, key) => {
                Params = Params.append(key, value);
            });

            return Params;
        }

        return null;
    }

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

    validationCPF(cpf: string) {
        let numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        if (cpf.length < 11) {
            return false;
        }
        for (i = 0; i < cpf.length - 1; i++) {
            if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        }
        if (!digitos_iguais) {
            numeros = cpf.substring(0, 9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--) {
                soma += numeros.charAt(10 - i) * i;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado.toString() !== digitos.charAt(0)) {
                return false;
            }
            numeros = cpf.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--) {
                soma += numeros.charAt(11 - i) * i;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado.toString() !== digitos.charAt(1)) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }
}
