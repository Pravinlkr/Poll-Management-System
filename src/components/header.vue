<template>
  <div>
  <b-navbar toggleable="sm" type="dark" variant="dark">
      <div class="container">
    <b-navbar-brand tag="router-link" :to="{ path: '/' }">PMS</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item tag="router-link" :to="{ path: '/login' }">Login</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item tag="router-link" :to="{ path: '/adduser' }">Add User</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
      </div>
  </b-navbar>
</div>
</template>

<script>
export default {
    name:'Header'
}
</script>