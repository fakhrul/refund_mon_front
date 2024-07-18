<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://www.llm.gov.my/" target="_blank">LLM</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} R&D Department</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="https://www.llm.gov.my">LLM</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
