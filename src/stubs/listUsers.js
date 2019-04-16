import AvatarIMG1 from '../img/Ellipse(1).png'
import AvatarIMG2 from '../img/Ellipse(2).png'
import AvatarIMG3 from '../img/Ellipse(3).png'
import AvatarIMG4 from '../img/Ellipse(4).png'
import AvatarIMG5 from '../img/Ellipse(5).png'
import AvatarIMG6 from '../img/Ellipse(6).png'
import AvatarIMG7 from '../img/Ellipse(7).png'
import {dbName} from "../Component/App/App";


// let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
// export let listUsers
//
// if (!indexedDB) {
//   window.alert("Ваш браузер не поддерживат стабильную версию IndexedDB. Такие-то функции будут недоступны")
// } else {
//   let stateRedux = indexedDB.open(dbName, 1)
//
//   stateRedux.onerror = function (event) {
//     // Handle errors.
//     console.log('stateRedux.onerror')
//   }
//
//   stateRedux.onupgradeneeded = function (event) {
//     let db = event.target.result
//     let objectStore2 = db.createObjectStore("listUsers", {keyPath: "id"});
//     let objectStore1 = db.createObjectStore("newUser1", {keyPath: "id"});
//     for (let i in listUsers) {
//       objectStore2.add(listUsers[i]);
//     }
//     objectStore1.add(newUser)
//
//   }


export let listUsers = {
    users: [
        {
            id: 1,
            userName: 'Maxim Morozov 1',
            userSRCAvatarIMG: [AvatarIMG1],
            firstName: 'Maxim',
            lastName: 'Morozov',
            birthDate: new Date(2000, 2, 1),
            email: 'my_email233123123123@gmail.com',
            address: 'Street TRUE, 130',
            gender: '',

            company: 'Company name',
            githubLink: '',
            facebookLink: 'facebook.com/',
            selectLanguage: null,
            fax: '+38 (066) 123 123 11',
            phoneN1: '+38 (066) 123 123 11',
            phoneN2: '+38 (066) 123 123 11',
            phoneN3: '+38 (066) 123 123 11',
            quantityPhoneField: 2,

            selectSkills: [{ value: "CSS", label: "CSS" },
                { value: "Javascript", label: "Javascript" },
                { value: "jQuery", label: "jQuery" },
                { value: "React", label: "React" },],
            textareaField: 'Guitar, guitar and guitar again. I’m fall in love with it.',
            checkboxArt: 'Art',
            checkboxSport: 'Sport,fitness, aerobica and staff like that',
            checkboxJustWant: 'just want to play games, I’m not living in this life',
            checkboxFemale: 'I’m a female... I’m doing nothing. Every day.',
            checkboxGuitar: 'Guitar, guitar and guitar again. I’m fall in love with it.',
            checkboxWtf: 'WTF is “hobbies”???',
        },
        {
            id: 2,
            userName: 'Maxim Morozov 2',
            password: '111',
            repeatPassword: '111',
            userSRCAvatarIMG: [AvatarIMG2],
            firstName: 'Maxim',
            lastName: 'Morozov',
            birthDate: new Date(2000, 2, 1),
            email: 'my_email1@gmail.com',
            address: 'Street TRUE, 130',
            gender: '',

            company: 'Company name',
            githubLink: '',
            facebookLink: 'facebook.com/',
            selectLanguage: null,
            fax: 'asd123dsf',
            phoneN1: '+38 (066) 123 123 11',
            phoneN2: '+38 (066) 123 123 11',
            phoneN3: '+38 (066) 123 123 11',
            quantityPhoneField: 2,

            selectSkills: [{ value: "CSS", label: "CSS" },
                { value: "Javascript", label: "Javascript" },
                { value: "jQuery", label: "jQuery" },
                { value: "React", label: "React" },],
            textareaField: 'Guitar, guitar and guitar again. I’m fall in love with it.',
            checkboxArt: 'Art',
            checkboxSport: false,
            checkboxJustWant: false,
            checkboxFemale: 'I’m a female... I’m doing nothing. Every day.',
            checkboxGuitar: false,
            checkboxWtf: false,
        },
        {
            id: 3,
            userName: 'Maxim Morozov 3',
            password: '111',
            repeatPassword: '111',
            userSRCAvatarIMG: [AvatarIMG3],
            firstName: 'Maxim',
            lastName: 'Morozov',
            birthDate: new Date(2000, 2, 1),
            email: 'my_email1@gmail.com',
            address: 'Street TRUE, 130',
            gender: '',

            company: 'Company name',
            githubLink: '',
            facebookLink: 'facebook.com/',
            selectLanguage: null,
            fax: 'asd123dsf',
            phoneN1: '+38 (066) 123 123 11',
            phoneN2: '+38 (066) 123 123 11',
            phoneN3: '+38 (066) 123 123 11',
            quantityPhoneField: 2,

            selectSkills: [{ value: "CSS", label: "CSS" },
                { value: "Javascript", label: "Javascript" },
                { value: "jQuery", label: "jQuery" },
                { value: "React", label: "React" },],
            textareaField: 'Guitar, guitar and guitar again. I’m fall in love with it.',
            checkboxArt: 'Art',
            checkboxSport: false,
            checkboxJustWant: false,
            checkboxFemale: 'I’m a female... I’m doing nothing. Every day.',
            checkboxGuitar: false,
            checkboxWtf: false,
        },
        {
            id: 4,
            userName: 'Maxim Morozov 4',
            password: '111',
            repeatPassword: '111',
            userSRCAvatarIMG: [AvatarIMG4],
            firstName: 'Maxim',
            lastName: 'Morozov',
            birthDate: new Date(2000, 2, 1),
            email: 'my_email1@gmail.com',
            address: 'Street TRUE, 130',
            gender: '',

            company: 'Company name',
            githubLink: '',
            facebookLink: 'facebook.com/',
            selectLanguage: null,
            fax: 'asd123dsf',
            phoneN1: '+38 (066) 123 123 11',
            phoneN2: '+38 (066) 123 123 11',
            phoneN3: '+38 (066) 123 123 11',
            quantityPhoneField: 2,

            selectSkills: [{ value: "CSS", label: "CSS" },
                { value: "Javascript", label: "Javascript" },
                { value: "jQuery", label: "jQuery" },
                { value: "React", label: "React" },],
            textareaField: 'Guitar, guitar and guitar again. I’m fall in love with it.',
            checkboxArt: 'Art',
            checkboxSport: false,
            checkboxJustWant: false,
            checkboxFemale: 'I’m a female... I’m doing nothing. Every day.',
            checkboxGuitar: false,
            checkboxWtf: false,
        },
        {
            id: 5,
            userName: 'Maxim Morozov 5',
            password: '111',
            repeatPassword: '111',
            userSRCAvatarIMG: [AvatarIMG5],
            firstName: 'Maxim',
            lastName: 'Morozov',
            birthDate: new Date(2000, 2, 1),
            email: 'my_email1@gmail.com',
            address: 'Street TRUE, 130',
            gender: '',

            company: 'Company name',
            githubLink: '',
            facebookLink: 'facebook.com/',
            selectLanguage: null,
            fax: 'asd123dsf',
            phoneN1: '+38 (066) 123 123 11',
            phoneN2: '+38 (066) 123 123 11',
            phoneN3: '+38 (066) 123 123 11',
            quantityPhoneField: 2,

            selectSkills: [{ value: "CSS", label: "CSS" },
                { value: "Javascript", label: "Javascript" },
                { value: "jQuery", label: "jQuery" },
                { value: "React", label: "React" },],
            textareaField: 'Guitar, guitar and guitar again. I’m fall in love with it.',
            checkboxArt: 'Art',
            checkboxSport: false,
            checkboxJustWant: false,
            checkboxFemale: 'I’m a female... I’m doing nothing. Every day.',
            checkboxGuitar: false,
            checkboxWtf: false,
        },
        {
            id: 6,
            userName: 'Maxim Morozov 6',
            password: '111',
            repeatPassword: '111',
            userSRCAvatarIMG: [AvatarIMG6],
            firstName: 'Maxim',
            lastName: 'Morozov',
            birthDate: new Date(2000, 2, 1),
            email: 'my_email1@gmail.com',
            gender: '',

            company: 'Company name',
            githubLink: '',
            facebookLink: 'facebook.com/',
            selectLanguage: null,
            fax: 'asd123dsf',
            phoneN1: '+38 (066) 123 123 11',
            phoneN2: '+38 (066) 123 123 11',
            phoneN3: '+38 (066) 123 123 11',
            quantityPhoneField: 2,

            selectSkills: [{ value: "CSS", label: "CSS" },
                { value: "Javascript", label: "Javascript" },
                { value: "jQuery", label: "jQuery" },
                { value: "React", label: "React" },],
            textareaField: 'Guitar, guitar and guitar again. I’m fall in love with it.',
            checkboxArt: 'Art',
            checkboxSport: false,
            checkboxJustWant: false,
            checkboxFemale: 'I’m a female... I’m doing nothing. Every day.',
            checkboxGuitar: false,
            checkboxWtf: false,
        },
        {
            id: 7,
            userName: 'Maxim Morozov 7',
            password: '111',
            repeatPassword: '111',
            userSRCAvatarIMG: [AvatarIMG7],
            firstName: 'Maxim',
            lastName: 'Morozov',
            birthDate: new Date(2000, 2, 1),
            email: 'my_email1@gmail.com',
            address: 'Street TRUE, 130',
            gender: '',

            company: 'Company name',
            githubLink: '',
            facebookLink: 'facebook.com/',
            selectLanguage: null,
            fax: 'asd123dsf',
            phoneN1: '+38 (066) 123 123 11',
            phoneN2: '+38 (066) 123 123 11',
            phoneN3: '+38 (066) 123 123 11',
            quantityPhoneField: 2,

            selectSkills: [{ value: "CSS", label: "CSS" },
                { value: "Javascript", label: "Javascript" },
                { value: "jQuery", label: "jQuery" },
                { value: "React", label: "React" },],
            textareaField: 'Guitar, guitar and guitar again. I’m fall in love with it.',
            checkboxArt: 'Art',
            checkboxSport: false,
            checkboxJustWant: false,
            checkboxFemale: 'I’m a female... I’m doing nothing. Every day.',
            checkboxGuitar: false,
            checkboxWtf: false,
        },
    ]
}

