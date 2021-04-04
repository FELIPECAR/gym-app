// ID client
// 323595725719-n8lh1f13rij5mub3219gefseu1a2gbhu.apps.googleusercontent.com

// token id
// eAGcmZOogn-C6qUk2oZh9i84

let inicio = document.getElementById('inicioSesion')
const google = document.getElementById('signInGoogle')
const userPerfil = document.getElementById('userPerfil')
const imgUser = document.getElementById('imgUser')


const getStorage = JSON.parse(localStorage.getItem('usuario'))

if (getStorage) {
    userPerfil.classList.remove('d-none')
    inicio.style.display="none"
    imgUser.setAttribute('src', getStorage.imgProfile)
    // imgUser.setAttribute('class', 'img-user')
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    const id = new Date().getTime()
    const nombre = profile.getName()
    const imgUrl = profile.getImageUrl()
    const email = profile.getEmail()

        google.style.display="none"
    
        const form = document.getElementById('formInfo')

        form.classList.remove('d-none')
        
        const inputs = document.querySelectorAll('#formInfo input')

        
        inputs.forEach( (input) => {
            input.addEventListener('keyup', validarFormulario)
            input.addEventListener('blur', validarFormulario)
        })


        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const eps = form.eps.value
            const contactoEmergencia = form.contactoEmergencia.value
            const limtSalud = form.limtSalud.value
            const medicina = form.medicina.value
            
            if (eps == "" && contactoEmergencia == "" && limtSalud == "" && medicina == "" || eps == "" && contactoEmergencia == "" && limtSalud == "" && medicina !== "") {
                const validador = document.getElementById('validadorGlobal')
                validador.classList.remove('d-none')
                return;
            }

            const elementoUser = {
                _id: id,
                nombreUser: nombre,
                imgProfile: imgUrl,
                emailuser: email,
                epsUser: eps,
                contacto: contactoEmergencia,
                limitacion: limtSalud,
                medicinaUser: medicina
            }

            if (elementoUser) {
                form.reset()
                const loader = document.getElementById('loader')
                loader.classList.remove('d-none')
                setTimeout(()=>{
                    loader.classList.add('d-none')
                    const exito = document.getElementById('exito')
                    exito.classList.remove('d-none')
                    location.reload()
                    localStorage.setItem('usuario', JSON.stringify(elementoUser))
                    inicio.style.display="none"
                    userPerfil.classList.remove('d-none')
                }, 3000)


            }
            let existeUsuario = localStorage.getItem('usuario')
            if (existeUsuario) {
                logout.classList.remove('d-none')
            }
        })

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        location.reload()
        logout.classList.add('d-none')
        localStorage.removeItem('usuario')
        console.log('User signed out.')
    });
}

const validarFormulario = (e) => {
    const validador = e.target.id
    switch (validador) {
        case 'eps':
            validarCampos(e.target.value, 'eps')
            break;
        case 'contactoEmergencia':
            validarCampos(e.target.value, 'contactoEmergencia')
            break;
        case 'limtSalud':
            validarCampos(e.target.value, 'limtSalud')
            break;
        case 'medicinaSi':
            validarCampos(e.target.value, 'medicinaSi')
            break;
        case 'medicinaNo':
            validarCampos(e.target.value, 'medicinaNo')
            break;
    
        default:
            break;
    }
}

const validarCampos = (event, nomCampo) => {
    if (event) {
        document.getElementById(nomCampo).classList.remove('is-invalid')
    }else{
        document.getElementById(nomCampo).classList.add('is-invalid')   
    }
}