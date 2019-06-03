import AvatarIMG1 from '../img/Ellipse(1).png'

export const users = []
for (let i = 0; i < 40; i += 1) {
  users[i] = {
    id: i,
    userName: `Maxim ${i + 1}`,
    password: '2222',
    repeatPassword: '2222',
    userAvatarIMG: AvatarIMG1,
    userAvatarIMGCropper: AvatarIMG1,
    firstName: 'Maxim',
    lastName: `Morozov ${i + 1}`,
    fullName: `Maxim Morozov ${i + 1}`,
    birthDate: new Date(1980, i, 1),
    email: `my_email${i + 1}@gmail.com`,
    address: 'Street TRUE, 130',
    gender: '',

    company: 'Company name',
    githubLink: '',
    facebookLink: 'facebook.com/',
    selectLanguage: null,
    fax: '+7 (066) 123 123 11',
    phoneArray: [{ phone: '+7 (066) 123 12 31' },
      { phone: '+7 (066) 123 12 32' },
      { phone: '+7 (066) 123 12 33' }],

    selectSkills: [{ value: 'CSS', label: 'CSS' },
      { value: 'Javascript', label: 'Javascript' },
      { value: 'jQuery', label: 'jQuery' },
      { value: 'React', label: 'React' }],
    textareaField: 'Guitar, guitar and guitar again. I’m fall in love with it.',
    checkboxArt: 'Art',
    checkboxSport: 'Sport,fitness, aerobica and staff like that',
    checkboxJustWant: 'just want to play games, I’m not living in this life',
    checkboxFemale: 'I’m a female... I’m doing nothing. Every day.',
    checkboxGuitar: 'Guitar, guitar and guitar again. I’m fall in love with it.',
    checkboxWtf: 'WTF is “hobbies”???',
    lastUpdate: new Date(2017, i, i),
  }
}
