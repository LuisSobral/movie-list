import { Plugin } from '@nuxt/types'

const axiosPlugin: Plugin = ({ $axios, $config }) => {
  $axios.onRequest(() => {
    if ($config.apiKey) {
      $axios.setHeader('Authorization', `Bearer ${$config.apiKey}`)
    }
  })
}

export default axiosPlugin
