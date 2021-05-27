<template lang="pug">
  v-main.grey.lighten-2
    v-layout.ma-3( row wrap )
      v-flex.d-md-inline( xs8 )
        v-sheet.pa-5(elevation="5" )
          v-avatar(class="profile"  color="grey" size="164" tile)
            v-img( src="@/assets/avatars/man.png" alt='Avatar')
          v-text-field(label="Name " single-line)
          v-text-field(label="Email " single-line)
          v-btn.ma-2(small ) Sample
         
      v-flex.d-md-inline( xs8 )
        v-sheet(height='50' color="green lighten-3" elevation="5" )   
</template>
