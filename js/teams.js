// Team data storage
let teams = JSON.parse(localStorage.getItem('teams')) || [];

// Initialize modals
const teamModal = new bootstrap.Modal(document.getElementById('teamModal'));
const inviteModal = new bootstrap.Modal(document.getElementById('inviteModal'));

// Create team function
function createTeam() {
    teamModal.show();
}

// Save team function
function saveTeam() {
    const name = document.getElementById('teamName').value;
    const description = document.getElementById('teamDescription').value;
    
    if (!name) return;

    const team = {
        id: Date.now(),
        name,
        description,
        members: [],
        tasks: []
    };

    teams.push(team);
    localStorage.setItem('teams', JSON.stringify(teams));
    
    renderTeams();
    teamModal.hide();
    document.getElementById('teamForm').reset();
}

// Render teams
function renderTeams() {
    const container = document.getElementById('teamsContainer');
    const teamSelect = document.getElementById('teamSelect');
    
    // Clear existing content
    container.innerHTML = '';
    teamSelect.innerHTML = '';
    
    teams.forEach(team => {
        // Add team card
        container.innerHTML += `
            <div class="col-md-4">
                <div class="team-card">
                    <div class="team-card-header">
                        <h3>${team.name}</h3>
                        <span class="badge bg-primary">${team.members.length} Members</span>
                    </div>
                    <p>${team.description}</p>
                    <div class="team-members">
                        ${team.members.map(member => `
                            <div class="member-avatar" title="${member.email}">
                                ${member.email[0].toUpperCase()}
                            </div>
                        `).join('')}
                    </div>
                    <div class="team-actions mt-3">
                        <button class="btn btn-sm btn-outline-primary" onclick="viewTeam(${team.id})">
                            View Details
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTeam(${team.id})">
                            Delete Team
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add option to select
        teamSelect.innerHTML += `<option value="${team.id}">${team.name}</option>`;
    });
}

// Invite member function
function inviteMember() {
    if (teams.length === 0) {
        alert('Please create a team first!');
        return;
    }
    inviteModal.show();
}

// Send invitation
function sendInvite() {
    const email = document.getElementById('memberEmail').value;
    const teamId = document.getElementById('teamSelect').value;
    
    if (!email || !teamId) return;

    const team = teams.find(t => t.id === parseInt(teamId));
    if (team) {
        team.members.push({
            email,
            joinedAt: new Date().toISOString()
        });
        
        localStorage.setItem('teams', JSON.stringify(teams));
        renderTeams();
        
        alert(`Invitation sent to ${email}`);
        inviteModal.hide();
        document.getElementById('inviteForm').reset();
    }
}

// View team details
function viewTeam(teamId) {
    const team = teams.find(t => t.id === teamId);
    if (team) {
        alert(`Team Details:\nName: ${team.name}\nMembers: ${team.members.length}\nDescription: ${team.description}`);
    }
}

// Delete team
function deleteTeam(teamId) {
    if (confirm('Are you sure you want to delete this team?')) {
        teams = teams.filter(t => t.id !== teamId);
        localStorage.setItem('teams', JSON.stringify(teams));
        renderTeams();
    }
}

// Initialize teams display
document.addEventListener('DOMContentLoaded', renderTeams);
