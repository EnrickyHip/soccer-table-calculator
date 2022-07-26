<script lang="ts">
  import TournamentButton from '../components/TournamentButton.svelte';
  import Title from '../components/Title.svelte';

</script>

<svelte:head>
  <title>Soccer Table Calculator</title>
</svelte:head>

<Title>
  Choose a Tournament to calculate
</Title>

<div>
  <TournamentButton alt="Premier League" href="/premier_league" logo="/images/premier_league.png">
    Premier League
  </TournamentButton>

  <TournamentButton alt="Brasileirão" href="/brasileirao" logo="/images/brasileirao.png">
    Brasileirão
  </TournamentButton>
</div>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    justify-items: center;
    gap: 3rem;
    margin-top: 5rem;
  }
</style>
