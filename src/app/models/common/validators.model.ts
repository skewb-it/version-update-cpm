export class ValidatorsModel {
    controlName: string;
    controlType: string;
    validations: ValidationModel[] = [] ;
    controls: ValidatorsModel[] = [];
}

export class ValidationModel {
    name: string;
    message: ValidationMessageModel;
    defaultMessage: string;
    field1:string;
    field2:string;
    operator: string;
}

export class ValidationMessageModel {
    value: string;
    isStatic: boolean;
    dynamicParams: any[];
}