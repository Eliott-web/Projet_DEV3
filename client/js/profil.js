// --- GESTION DE LA MODAL ---
function openSettings() {
    // On remet la modal en mode "Profil"
    document.getElementById('modal-title').innerText = "Modifier mes infos";
    document.getElementById('label-name').innerText = "Nouveau pseudo";
    document.getElementById('bio-group').style.display = "block";
    document.getElementById('save-btn').setAttribute("onclick", "saveProfile()");
    
    document.getElementById('settings-modal').style.display = 'flex';
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

function saveProfile() {
    const newName = document.getElementById('edit-name').value;
    const newBio = document.getElementById('edit-bio').value;

    if(newName) document.getElementById('display-username').innerText = newName;
    if(newBio) document.getElementById('display-bio').innerText = newBio;

    closeSettings();
}

// --- CHANGEMENT PHOTO ---
document.getElementById('upload-photo').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(){
        document.getElementById('display-avatar').src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

// --- GESTION DES ONGLETS ---
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 1. Retirer la classe 'active' des boutons
        tabs.forEach(t => t.classList.remove('active'));
        // 2. Retirer la classe 'active' des contenus
        contents.forEach(c => c.classList.remove('active'));

        // 3. Ajouter 'active' au bouton cliqué
        tab.classList.add('active');
        // 4. Afficher le contenu lié via data-target
        const target = tab.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});

// --- SUPPRESSION PROJET ---
// Utilisation de la délégation d'événement sur le body ou le container
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn') || e.target.innerText === '🗑️') {
        const card = e.target.closest('.project-card');
        const title = card.querySelector('h4').innerText;

        if (confirm(`Es-tu sûr de vouloir supprimer le projet "${title}" ?`)) {
            card.style.transform = "scale(0.8)";
            card.style.opacity = "0";
            setTimeout(() => {
                card.remove();
            }, 300);
        }
    }
});

// --- MODIFICATION PROJET ---
let currentProjectCard = null; // Pour savoir quelle carte on modifie

function openEditProject(btn) {
    currentProjectCard = btn.closest('.project-card');
    const currentTitle = currentProjectCard.querySelector('h4').innerText;
    
    // On adapte la modal
    document.getElementById('modal-title').innerText = "Modifier le projet";
    document.getElementById('label-name').innerText = "Nom du projet";
    document.getElementById('edit-name').value = currentTitle;
    document.getElementById('bio-group').style.display = "none"; // On cache la bio pour un projet
    
    // On change la fonction du bouton enregistrer
    document.getElementById('save-btn').setAttribute("onclick", "saveProjectName()");
    
    document.getElementById('settings-modal').style.display = 'flex';
}

function saveProjectName() {
    const newName = document.getElementById('edit-name').value;
    if(newName && currentProjectCard) {
        currentProjectCard.querySelector('h4').innerText = newName;
    }
    closeSettings();
}