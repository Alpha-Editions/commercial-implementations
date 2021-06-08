const differenciators = document.querySelectorAll('.differenciator');

let variant = Math.round(Math.random());

if (variant == 0) {
    variant = 'a';
}
else {
    variant = 'b';
    differenciators.forEach(function() {
        this.classList.remove('d-none');
    });
}

const firebaseConfig = {
    apiKey: "AIzaSyBxc9MFFJhK8zCHeWZDM-SKygfFVePRluY",
    authDomain: "alpha-editions-ab-testing.firebaseapp.com",
    projectId: "alpha-editions-ab-testing",
    storageBucket: "alpha-editions-ab-testing.appspot.com",
    messagingSenderId: "150792598647",
    appId: "1:150792598647:web:ce4e624fc9bd0cb23d4272"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const project = document.getElementsByTagName('html')[0].id;

function registerClick() {
    database.ref(project + '/variant-' + variant + '/clicks').set(ServerValue.increment(1));
}