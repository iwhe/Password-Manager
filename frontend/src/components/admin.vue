<template>
    <div class="admin-panel">
      <!-- Top header -->
      <header class="header">
        <div class="logo">password manager</div>
        <div class="profile">
          <img :src="profileImage" class="profile-img" alt="Profile" />
          <div class="profile-info">
            <h3>{{ adminName }}</h3>
            <p>{{ adminEmail }}</p>
            <button @click="logout" class="logout-btn">Log out</button>
          </div>
        </div>
      </header>
  
      <div class="main-content">
        <!-- Sidebar -->
        <aside class="sidebar">
          <div class="menu-toggle">
            <button @click="toggleSidebar">☰</button>
          </div>
          
          <nav :class="{ 'collapsed': isSidebarCollapsed }">
            <!-- Home section -->
            <div class="nav-item">
              <router-link to="/home" class="nav-link">
                <i class="icon-home"></i>
                <span>Home</span>
              </router-link>
            </div>
  
            <!-- Users section -->
            <div class="nav-section">
              <h3>Users</h3>
              <router-link to="/roles" class="nav-link">Manage Roles</router-link>
              <router-link to="/manager" class="nav-link">Manager</router-link>
              <router-link to="/developers" class="nav-link">Developers</router-link>
              <router-link to="/designers" class="nav-link">Designers</router-link>
            </div>
  
            <!-- Passwords section -->
            <div class="nav-section">
              <h3>Passwords</h3>
              <router-link to="/directory" class="nav-link">Manage Directory</router-link>
              <router-link to="/subdirectory" class="nav-link">Manage Subdirectory</router-link>
              <router-link to="/entity" class="nav-link">Manage Entity</router-link>
              <router-link to="/password" class="nav-link">Manage Password</router-link>
            </div>
          </nav>
        </aside>
  
        <!-- Main content area -->
        <main class="content">
          <h1>Your Directories</h1>
          <div class="directories-grid">
            <div v-for="directory in directories" 
                 :key="directory.id" 
                 class="directory-card"
                 @click="openDirectory(directory.id)">
              <i class="icon-folder"></i>
              <span>{{ directory.name }}</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // State
  const isSidebarCollapsed = ref(false)
  const adminName = ref('Admin Name')
  const adminEmail = ref('email@passwordmanager.com')
  const profileImage = ref('../assets/images/icon.png')
  
  const directories = ref([
    { id: 1, name: 'Directory 1' },
    { id: 2, name: 'Directory 2' },
    { id: 3, name: 'Directory 3' },
    { id: 4, name: 'Directory 4' },
    { id: 5, name: 'Directory 5' }
  ])
  
  // Methods
  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }
  
  const openDirectory = (id) => {
    router.push(`/directory/${id}`)
  }
  
  const logout = () => {
    // Implement logout logic
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .admin-panel {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .profile {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  
  .main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
  
  .sidebar {
    width: 250px;
    border-right: 1px solid #e0e0e0;
    animation: slideRight 0.5s ease-in-out;
  }
  
  .sidebar .collapsed {
    display: none;
    border-right: none;
    width: 60px;
    animation: slideRight 0.5s ease-in-out;
  }
  
  @keyframes slideRight {
    0%{
        transform: translateX(-100%);
        opacity: 0;
    }
    50%{
        transform: translateX(-50%);
        opacity: 0.5;
    }
    100%{
        transform: translateX(0%);
        opacity: 1;
    }
  }
  .nav-section {
    padding: 1rem;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #333;
  }
  
  .nav-link:hover {
    background-color: #f5f5f5;
  }
  
  .content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
  }
  
  .directories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .directory-card {
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .directory-card:hover {
    background-color: #f5f5f5;
  }
  
  .logout-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #f0f0f0;
    cursor: pointer;
  }
  
  .logout-btn:hover {
    background-color: #e0e0e0;
  }
  </style>