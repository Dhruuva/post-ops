<template lang="pug">
  v-main.grey.lighten-2
    v-container
      v-row
        template(v-for='n in 4')
          v-col.mt-2(:key='n' cols='12')
            strong Category {{ n }}
          v-col(v-for='j in 6' :key='`${n}${j}`' cols='6' md='2')
            v-sheet(height='150')
</template>
