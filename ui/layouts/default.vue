<template>
  <div id="app" dir="rtl">
    <b-navbar toggleable variant="primary" type="inverse">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-link class="navbar-brand" to="#">
        <span>Atendee</span>
      </b-link>
  
      <b-nav is-nav-bar>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/users">Users</b-nav-item>
        <b-nav-item to="/">Rooms</b-nav-item>
        <b-nav-item to="/sessions">Sessions</b-nav-item>
        <b-nav-item to="/devices">Devices</b-nav-item>
        <b-nav-item to="/">Clients</b-nav-item>
        <b-nav-item to="/logs">Log</b-nav-item>
      </b-nav>
  
    </b-navbar>
  
    <div class="container">
      <nuxt/>
    </div>
  </div>
</template>

<style>

</style>
