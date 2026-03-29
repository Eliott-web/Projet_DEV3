// --- VARIABLES GLOBALES ---
let currentProjectCard = null;

// --- GESTION DES ONGLETS ---
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const target = tab.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});

// --- MODAL PROFIL / PROJET ---
function openSettings() {
    document.getElementById('modal-title').innerText = "Modifier mes infos";
    document.getElementById('label-name').innerText = "Nouveau pseudo";
    document.getElementById('bio-group').style.display = "block";
    document.getElementById('save-btn').setAttribute("onclick", "saveProfile()");
    document.getElementById('settings-modal').style.display = 'flex';
}

function openEditProject(btn) {
    currentProjectCard = btn.closest('.project-card');
    const currentTitle = currentProjectCard.querySelector('h4').innerText;
    
    document.getElementById('modal-title').innerText = "Modifier le projet";
    document.getElementById('label-name').innerText = "Nom du projet";
    document.getElementById('edit-name').value = currentTitle;
    document.getElementById('bio-group').style.display = "none";
    document.getElementById('save-btn').setAttribute("onclick", "saveProjectName()");
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

function saveProjectName() {
    const newName = document.getElementById('edit-name').value;
    if(newName && currentProjectCard) {
        currentProjectCard.querySelector('h4').innerText = newName;
    }
    closeSettings();
}

// --- GESTION DES AVATARS ---
function openAvatarModal() {
    document.getElementById('avatar-modal').style.display = 'flex';
}

function closeAvatarModal() {
    document.getElementById('avatar-modal').style.display = 'none';
}

function selectPredefined(src) {
    document.getElementById('display-avatar').src = src;
    closeAvatarModal();
}

document.getElementById('upload-photo').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(){
        document.getElementById('display-avatar').src = reader.result;
        closeAvatarModal();
    };
    if(e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
});

// --- SUPPRESSION ---
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn') || e.target.innerText === '🗑️') {
        const card = e.target.closest('.project-card');
        if (confirm(`Supprimer ce projet ?`)) {
            card.style.opacity = "0";
            setTimeout(() => card.remove(), 300);
        }
    }
});

// Fermer les modals si clic extérieur
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        closeSettings();
        closeAvatarModal();
    }
}