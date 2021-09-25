<template>
  <section id="team" class="team">
    <div class="container">
      <div class="team__inner">
        <h3>{{ title }}</h3>
        <div class="team__image">
          <img :src="image.src" :alt="image.alt" />
        </div>
        <div class="team__members">
          <div v-for="(member, i) in members" :key="i" class="team__member">
            <p>{{ member.name }}</p>
            <span>{{ member.info }}</span>
          </div>
        </div>
        <p v-for="(item, j) in texts" :key="j" class="team__additional-text">
          {{ item.text }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Team',
  data() {
    return {
      title: 'Let’s get a better look at this Team of Freaks!',
      image: {
        src: require('@/assets/img/team.jpg'),
        alt: 'team'
      },
      members: [
        {
          name: 'Danior is the Gypsy King',
          info: '(FOUNDER) that owns this Amusement Park called “O.R.A.C.L.E.”. Knows a little magic and has a few million dollar ideas that keep him rich and popular.'
        },
        {
          name: 'Kioko or the Sneaky Foxy',
          info: '(WEB DESIGNER) - came from faraway Japan many years ago because got bored and was looking for real fun.'
        },
        {
          name: 'Woodrow is the Dead Creeper',
          info: '(MARKETING) - once he was a Ranger, but now only gets out before people to make a show once in a year. Scaring kids and taking off their candies eases his boredom.'
        },
        {
          name: 'Crazy Spook',
          info: '(LEAD DEVELOPER) - unpleasant ghost that likes dirty tricks.'
        },
        {
          name: 'Lucius is the Hellish Incubus',
          info: '(MARKETING). He did his work so poorly down there, that high ranked demons sent him to do the laziest job ever - give people nightmares.'
        }
      ],
      texts: [
        {
          text: 'Every year these nocturnal creatures have a tradition of hanging out together before the All Saints` Eve. The most favourite place of theirs is local Amusement Parks: they pretend to be carnies and get around by tricking folks.'
        },
        {
          text: 'But the major fun has always been a tent of Fortune Teller. Here’s Gypsy King, Sneaky Foxy, Dead Creeper, Crazy Spook and Hellish Incubus giving out predictions of all kinds to every curious seeker'
        }
      ]
    }
  }
}
</script>

<style></style>
