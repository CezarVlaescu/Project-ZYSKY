// TypeScript -> este un limbaj de programare, este un supraset al JS
//            -> ofera multe features ca si access modifiers (public, private, protected), ofera anumite structuri (interfate, type-uri, tupluri), generice
//            -> de asemenea suporta feature-uri moderne ca si arrow functions sau const
//            -> ofera suport pentru programarea orientata pe obiect 
//            -> browserul nu intelege typescriptul, deci el trebuie sa fie transpilat, convertit in JS (tsc -> script.js)

// Type basics -> type-ul variabilelor este strict, nu putem de exemplu sa schimbam un string in number ca in JS chiar daca avem let
//             -> type castingul variablilelor se face la compile time


let myString = 'string'; // typescript detecteaza direct ce tip de variabila avem, putem pune : string daca dorim sa fim mai expliciti
//myString = 20; we cant

let names : any = [1, 'cezar', true]

let nigga = {
   name: 'mario',
   belt: 'black',
   age: 30
} // de indata ce am creat un obiect nu putem sa adaugam proprietati noi

// nigga.skills = ['fighting']

// nigga = {
//     name: 'cezar',
//     belt: 'orange',
//     age: 40,
//     skills: ['combat'] // nu poti 
// }

// Explicit types -> putem sa declaram o variabila fara sa o initializam, dar trebuie sa specificam ce type va avea in viitor

let character : string; // deci in viitor va avea un string ca si valoare
let array : (string | number)[]; // union type un array care va avea atat strings cat si numbers

// tsconfig -> ne ajuta sa redirectionam mai usor (rootDir) unde va fi compilat dupa transpilare fisierul js (tsc --init)

// Functions

let hey : Function;
hey = () => console.log('hey');

const add = (a: number, b: number) : number => a + b;

// Type Aliases -> ne ajuta sa creem noi nume pentru type-urile existente pentru reutilizabilitate si ordonare
//              -> In the other case a type cannot be changed outside of its declaration.

type StringOrNum = string | number;

//type StringOrNum = string | undefined; /

type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]:  () => T[K];
};

type objWithName = {
    name: string,
    item: StringOrNum
}

const logDetails = (uid: StringOrNum, item: string) => console.log(`Hello you are logged with ${uid}, ${item}`);

// Function signatures

let calc : (a: number, b: number, c: number) => number; // a signature care poate fi folosit pentru mai multe calcule

// DOM si type casting

const anchor = document.querySelector('a')!;
const form = document.querySelector('.form-of-type') as HTMLFormElement; // type casting, adica acest form care era initial type Element, va fi un FormElement

console.log(anchor.href);
console.log(form.children);

const typeField = document.querySelector('#invoice') as HTMLSelectElement;
const toForm = document.querySelector('#payment') as HTMLInputElement;

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    console.log(typeField.value, toForm.valueAsNumber)
})

// Classes

class Invoice {
    // readonly client: string; 
    // details: string; // by default are public
    // private amount: number;

    // constructor(c: string, d: string, a: number) {
    //     this.client = c;
    //     this.details = d;
    //     this.amount = a;
    // }

    constructor(
        readonly client: string,
        private details: string,
        public amount: number
    ) {}

    format() : string {
        return `${this.client} owes ${this.amount} for ${this.details}`
    }
}

let invoices : Invoice[] = [];
