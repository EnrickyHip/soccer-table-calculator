
<header>
  <nav>
    <h1>
      <a href="/">
        <slot />
      </a>
    </h1>
  </nav>
</header>

<style>
  nav {
    display: flex;
    height: 4rem;
    align-items: center;
    justify-content: center;
    background-color: rgb(61, 61, 61);
  }

  a {
    color:  rgb(233, 233, 233);
  }
</style>
