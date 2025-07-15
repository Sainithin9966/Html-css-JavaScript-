// Global state
let currentUser = null;

// Login functionality
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email && password) {
        // Simulate login success
        currentUser = {
            name: 'John Doe',
            email: email,
            profilePic: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
        };
        
        // Hide login page and show main app
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        
        // Add smooth transition
        document.getElementById('mainApp').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('mainApp').style.transition = 'opacity 0.3s ease-in';
            document.getElementById('mainApp').style.opacity = '1';
        }, 50);
    } else {
        alert('Please enter both email and password');
    }
}

// Signup modal functionality
function showSignup() {
    document.getElementById('signupModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSignup() {
    document.getElementById('signupModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function signup() {
    // Simulate signup success
    alert('Account created successfully! Please log in.');
    closeSignup();
}

// Create post modal functionality
function openCreatePost() {
    document.getElementById('createPostModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on textarea
    setTimeout(() => {
        document.querySelector('#createPostModal textarea').focus();
    }, 100);
}

function closeCreatePost() {
    document.getElementById('createPostModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clear textarea
    document.querySelector('#createPostModal textarea').value = '';
}

// Post interactions
function likePost(element) {
    element.classList.toggle('liked');
    const icon = element.querySelector('i');
    const text = element.querySelector('span');
    
    if (element.classList.contains('liked')) {
        icon.style.color = '#1877f2';
        text.style.color = '#1877f2';
        text.textContent = 'Liked';
    } else {
        icon.style.color = '#65676b';
        text.style.color = '#65676b';
        text.textContent = 'Like';
    }
}

// Add click handlers for like buttons
document.addEventListener('DOMContentLoaded', function() {
    // Handle like button clicks
    document.addEventListener('click', function(e) {
        if (e.target.closest('.action-btn') && e.target.closest('.action-btn').querySelector('span').textContent.includes('Like')) {
            likePost(e.target.closest('.action-btn'));
        }
    });
    
    // Handle modal clicks (close when clicking outside)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            if (e.target.id === 'signupModal') {
                closeSignup();
            } else if (e.target.id === 'createPostModal') {
                closeCreatePost();
            }
        }
    });
    
    // Handle Enter key for login
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && document.getElementById('loginPage').style.display !== 'none') {
            login();
        }
    });
    
    // Simulate real-time features
    simulateActivity();
});

// Simulate real-time activity
function simulateActivity() {
    // Simulate new notifications
    setInterval(() => {
        const notificationIcon = document.querySelector('.header-icon .fa-bell');
        if (notificationIcon && Math.random() > 0.7) {
            notificationIcon.style.color = '#1877f2';
            setTimeout(() => {
                notificationIcon.style.color = '';
            }, 3000);
        }
    }, 10000);
    
    // Simulate online status changes
    setInterval(() => {
        const onlineStatuses = document.querySelectorAll('.online-status');
        onlineStatuses.forEach(status => {
            if (Math.random() > 0.8) {
                status.style.display = status.style.display === 'none' ? 'block' : 'none';
            }
        });
    }, 15000);
}

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add loading states for better UX
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('login-btn') || this.classList.contains('signup-btn')) {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 1000);
            }
        });
    });
});

// Add post creation functionality
document.addEventListener('DOMContentLoaded', function() {
    const postBtn = document.querySelector('.post-btn');
    const textarea = document.querySelector('#createPostModal textarea');
    
    if (textarea) {
        textarea.addEventListener('input', function() {
            if (this.value.trim()) {
                postBtn.disabled = false;
                postBtn.style.background = '#1877f2';
            } else {
                postBtn.disabled = true;
                postBtn.style.background = '#e4e6ea';
            }
        });
    }
    
    if (postBtn) {
        postBtn.addEventListener('click', function() {
            const content = textarea.value.trim();
            if (content) {
                createNewPost(content);
                closeCreatePost();
            }
        });
    }
});

// Create new post function
function createNewPost(content) {
    const feed = document.querySelector('.feed');
    const firstPost = document.querySelector('.post');
    
    const newPost = document.createElement('div');
    newPost.className = 'post';
    newPost.style.opacity = '0';
    newPost.style.transform = 'translateY(-20px)';
    
    newPost.innerHTML = `
        <div class="post-header">
            <div class="post-user">
                <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" alt="Profile" class="profile-pic">
                <div class="post-info">
                    <h4>John Doe</h4>
                    <p>Just now • <i class="fas fa-globe-americas"></i></p>
                </div>
            </div>
            <div class="post-options">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
        <div class="post-content">
            <p>${content}</p>
        </div>
        <div class="post-stats">
            <div class="post-reactions">
                <div class="reaction-icons">
                    <span class="reaction like">👍</span>
                </div>
                <span>1</span>
            </div>
            <div class="post-comments-shares">
                <span>0 comments</span>
                <span>0 shares</span>
            </div>
        </div>
        <hr>
        <div class="post-actions">
            <div class="action-btn">
                <i class="fas fa-thumbs-up"></i>
                <span>Like</span>
            </div>
            <div class="action-btn">
                <i class="fas fa-comment"></i>
                <span>Comment</span>
            </div>
            <div class="action-btn">
                <i class="fas fa-share"></i>
                <span>Share</span>
            </div>
        </div>
    `;
    
    // Insert before the first existing post
    feed.insertBefore(newPost, firstPost);
    
    // Animate in
    setTimeout(() => {
        newPost.style.transition = 'all 0.3s ease-out';
        newPost.style.opacity = '1';
        newPost.style.transform = 'translateY(0)';
    }, 50);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-container input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        if (document.getElementById('signupModal').style.display === 'block') {
            closeSignup();
        }
        if (document.getElementById('createPostModal').style.display === 'block') {
            closeCreatePost();
        }
    }
});

// Add search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            // Simulate search suggestions
            if (query.length > 2) {
                console.log('Searching for:', query);
                // Here you would typically make an API call
            }
        });
    }
});