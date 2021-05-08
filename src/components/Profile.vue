<template lang="pug">
  v-container(fluid)
    v-layout(column)
      v-card
        v-card-text
          v-flex.mb-4
            v-avatar.mr-4(size='96')
              img(:src="'/avatars/avatar_' + (form.avatar.toLowerCase()) + '.png'" alt='Avatar')
            v-btn(@click='openAvatarPicker') Change Avatar
          v-text-field(v-model='form.name' label='Name')
          v-text-field(v-model='form.email' label='Email')
          v-text-field(v-model='form.contactEmail' label='Email Address')
        v-card-actions
          v-btn(color='primary' :loading='loading' @click='update')
            v-icon(left dark) check
            | Save Changes
   

</template>

<script>
  export default {
    pageTitle: 'My Profile',
    components: {  },
    data () {
        return {
            loading: false,
            form: {
                firstName: 'John',
                lastName: 'Doe',
                contactEmail: 'john@doe.com',
                avatar: 'MALE_CAUCASIAN_BLOND_BEARD'
            },
            showAvatarPicker: false
        }
    },
    methods: {
        update () {
            this.showAvatarPicker = true
        },
        selectAvatar (avatar) {
            this.form.avatar = avatar
        }
    }
}
</script>