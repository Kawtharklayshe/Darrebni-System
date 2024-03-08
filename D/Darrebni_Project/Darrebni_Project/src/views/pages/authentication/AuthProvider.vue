<script setup>
import { useTheme } from 'vuetify'

const { global } = useTheme()

const authProviders = [
  {
    icon: 'fa-facebook',
    color: '#4267b2',
    link: 'https://www.facebook.com/darrebni.co', // Replace with your Facebook link
  },
  {
    icon: 'fa-linkedin',
    color: '#dd4b39',
    link: 'https://www.linkedin.com/in/%2Fcompany%2Fdarrebni?fbclid=IwAR10_7nhDFTDI4nxyCji_bk0IvepCM3B6aPnm_TwXVXoGyk7VmfiMTgxk0M', // Replace with your Google link
  },
  {
    icon: 'fa-instagram',
    color: '#1da1f2',
    link: 'https://www.instagram.com/darrebni.co?fbclid=IwAR2ORwRoXGH-KIieaBZ5e6ToUg1xGfqZsF21incCAe2n-NnWhfoHPiSFVeE', // Replace with your Twitter link
  },
]
</script>

<template>
  <div class="d-flex justify-center flex-wrap gap-3">
    <a v-for="provider in authProviders" :key="provider.icon" :href="provider.link" target="_blank" rel="noopener noreferrer">
      <VBtn
        icon
        variant="tonal"
        size="38"
        :color="global.name.value === 'dark' ? provider.colorInDark : provider.color"
        class="rounded"
      >
        <VIcon
          size="18"
          :icon="provider.icon"
        />
      </VBtn>
    </a>
  </div>
</template>
