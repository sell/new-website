<template>
  <div class="grid">
    <div v-for="(project, i) in projects" :key="i" class="card fade-in" :style="{ animationDelay: i * 300 + 'ms' }">
      <div :style="{ backgroundImage: `url('${project.image}')`}" class="image">
        <i v-if="!project.image" class="bx bx-image" style="font-size: 64px; color: rgba(0,0,0,.54);" />
      </div>
      <div class="card__title">
        {{ project.name }}
      </div>
      <div class="card__subtitle">
        {{ project.subtitle }}
      </div>
      <div class="card__text">
        {{ project.about }}
      </div>
      <div class="card__tools">
        <span v-if="project.tools.length === 0">
          <i class="bx bx-question-mark" />
        </span>
        <span v-for="(tool, x) in project.tools" :key="x">
          <i :class="`bx ${tool.includes('db') ? 'bx-data' : `bxl-${tool}`}`" />
        </span>
      </div>
      <div class="card__links">
        <a :href="project.domain" target="_blank">
          <span>VISIT</span>
        </a>
        <a v-if="project.github" :href="project.github" target="_blank">
          <span>GITHUB</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsCard',
  props:
      {
        projects: {
          type: Array,
          default: () => [],
        },
      },
};
</script>
