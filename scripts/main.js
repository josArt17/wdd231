const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const contCourses = document.querySelector('#cont-courses');
const userCredits = document.querySelector('#total-credits');
const currentYear = document.querySelector('#currentYear');
const lastModified = document.querySelector('#lastModified');


currentYear.innerHTML = "©2024";
lastModified.innerHTML = document.lastModified;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

let buttons = document.querySelectorAll('.page-button');

function activePage(event) {
    buttons.forEach(button => {
        button.classList.remove('menu-active');
    });

    event.target.classList.add('menu-active');
}

buttons.forEach(button => {
    button.addEventListener('click', activePage);
});



menu.addEventListener('click', function() {
    let navBar = document.querySelector('#navigation');
    navBar.classList.toggle('active');
});

const allClases = () => {
    contCourses.innerHTML = '';
    userCredits.innerHTML = '';
    let totalCredits = 0;
    let creditsComplete = 0;

    courses.forEach(element => {
        let subject = element.subject;
        let number = element.number;
        let completed = element.completed;
        let credits = element.credits;

        if (completed === true) {
            contCourses.innerHTML += `<div class ='cont-courses course-true'><p>${subject} ${number}</p></div>`;
            creditsComplete += credits;
        } else {

            contCourses.innerHTML += `<div class ='cont-courses'><p>${subject} ${number}</p></div>`;
        }

        totalCredits += credits;

    });

    let remain = totalCredits - creditsComplete;;
    userCredits.innerHTML = `<p class ='credits-complete'>You have ${creditsComplete} credits, you need ${remain} more credits for get the certificate</p>`;
}

const cseClases = () => {
    contCourses.innerHTML = '';
    userCredits.innerHTML = '';

    let totalCredits = 0;
    let creditsComplete = 0;

    courses.forEach(element => {

        if (element.subject === 'CSE') {
            let subject = element.subject;
            let number = element.number;
            let completed = element.completed;
            let credits = element.credits;

            if (completed === true) {
                contCourses.innerHTML += `<div class ='cont-courses course-true'><p>${subject} ${number}</p></div>`;
                creditsComplete += credits;
            } else {

                contCourses.innerHTML += `<div class ='cont-courses'><p>${subject} ${number}</p></div>`;
            }

            totalCredits += credits;
        }
        

    });
}

const wddClases = () => {
    contCourses.innerHTML = '';
    userCredits.innerHTML = '';

    let totalCredits = 0;
    let creditsComplete = 0;

    courses.forEach(element => {

        if (element.subject === 'WDD') {
            let subject = element.subject;
            let number = element.number;
            let completed = element.completed;
            let credits = element.credits;

            if (completed === true) {
                contCourses.innerHTML += `<div class ='cont-courses course-true'><p>${subject} ${number}</p></div>`;
                creditsComplete += credits;
            } else {

                contCourses.innerHTML += `<div class ='cont-courses'><p>${subject} ${number}</p></div>`;
            }

            totalCredits += credits;
        }
        

    });
}



const cseButton = document.querySelector('#cse');
cseButton.addEventListener('click', function(){
    cseClases();
});

const wddButton = document.querySelector('#wdd');
wddButton.addEventListener('click', function(){
    wddClases();
});

const allButton = document.querySelector('#all');
allButton.addEventListener('click', function(){
    allClases();
});

allClases();