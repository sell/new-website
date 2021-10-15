<template>
  <div>
    <ProjectsCard :projects="projects" />
  </div>
</template>

<script>
const projects = [
  {
    name: 'Profile Hub',
    subtitle: 'Social Media Links Centralized',
    domain: '//profilehub.me?utm_source=jayson.codes',
    about:
      'Profile hub, is a place to create announcements and keep all links in one location.',
    tools: ['vuejs', 'nuxtjs', 'redis', 'mongodb'],
    image:
      'https://media.discordapp.net/attachments/854927794571575316/897928104574607360/g21e88.png',
  },
  {
    name: 'Discord Bot Lists',
    subtitle: 'Modern Bot List',
    domain: '//botlists.com?utm_source=jayson.codes',
    github: '//github.com/botlists',
    about:
      'Discord Bot List, a place to find the best discord bots for your server.',
    tools: ['vuejs', 'nodejs', 'express', 'redis', 'mongodb'],
    image:
      'https://media.discordapp.net/attachments/854927794571575316/855341113794887680/dbl29.png?width=1578&height=976',
  },
  {
    name: 'No Api Key',
    subtitle: 'no-api-key',
    domain: '//no-api-key.com',
    about:
      'An api with a bunch of routes containing things like image manipulation and more.',
    tools: ['nodejs', 'express', 'redis', 'mongodb', 'pug'],
    image:
      'https://media.discordapp.net/attachments/854927794571575316/864531774401675274/recddt990.png',
  },
  {
    name: 'Emoji Downloader',
    subtitle: 'Download Emojis with Ease',
    domain: '//e-d.me',
    about:
      'Emoji Downloader, the best emoji downloader discord bot. Downloads emojis straight to your discord.',
    tools: ['nodejs', 'discord.js', 'redis', 'mongodb'],
    image:
      'https://media.discordapp.net/attachments/854927794571575316/864594676542603275/rect24hsfsf3s6.png',
  },
];
export default {
  data() {
    return {
      projects,
    };
  },
};
</script>
