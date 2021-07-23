<template>
  <div class="container">
    <h1>Contact Form</h1>
    <div
      v-if="error.show || success.show"
      :class="`notification ${error.show && 'error'} ${success.show && 'success'}`"
    >
      <p>{{ error.message || success.message }}</p>
      <span class="close" @click="closeNotification">
        <i style="font-size: 1.3rem" class="bx bx-x" />
      </span>
    </div>
    <div class="form">
      <div v-if="loading" class="loader__container">
        <div class="loader" />
      </div>
      <div class="field">
        <label for="name"> Your name </label>
        <input
          id="name"
          v-model="name"
          type="text"
          maxlength="30"
          placeholder="John Smith"
          :disabled="loading"
          :class="{ loading__background: loading }"
        >
      </div>
      <div class="field">
        <label for="email"> Email Address </label>
        <input
          id="email"
          v-model="email"
          type="email"
          maxlength="40"
          placeholder="example@example.com"
          :disabled="loading"
          :class="{ loading__background: loading }"
        >
      </div>
      <div class="field">
        <label for="subject"> Message Subject </label>
        <input
          id="subject"
          v-model="subject"
          type="text"
          maxlength="40"
          placeholder="Job Offer"
          :disabled="loading"
          :class="{ loading__background: loading }"
        >
      </div>
      <div class="field">
        <label for="message"> Message </label>
        <textarea
          id="message"
          v-model="message"
          maxlength="500"
          placeholder="Your Contact Message"
          :disabled="loading"
          :class="{ loading__background: loading }"
        />
      </div>
      <div class="field">
        <div class="input">
          <input type="checkbox" @click="agreed = !agreed">
          <p>
            By Submitting this form you agree to the:
            <nuxt-link to="/privacy">
              Privacy Policy
            </nuxt-link>.
          </p>
        </div>
      </div>
      <div class="buttons">
        <button :class="{ loading__background: loading }" @click="submit">
          Submit
        </button>
        <button @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default {
  data() {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
      agreed: false,
      loading: false,
      error: {
        show: false,
        message: '',
      },
      success: {
        show: false,
        message: '',
      },
    };
  },
  methods: {
    closeNotification() {
      this.error.show = false;
      this.error.message = '';
      this.success.show = false;
      this.success.message = '';
    },
    async submit() {
      if (this.loading || !this.agreed) {
        return;
      }
      this.error.show = false;
      this.success.show = false;
      /*
        Form Validation
       */
      if (!this.name || this.name.split(' ').length < 2 || this.name.split(' ')[1].replace(/\s/g, '').length < 2) {
        this.error.show = true;
        this.error.message = 'Invalid Name';
        return;
      }
      if (!emailRegex.test(this.email)) {
        this.error.show = true;
        this.error.message = 'Invalid Email Address';
        return;
      }
      if (this.subject.replace(/\s/g, '').length < 5) {
        this.error.show = true;
        this.error.message = 'Invalid Subject';
        return;
      }
      if (this.message.replace(/\s/g, '').length < 50) {
        this.error.show = true;
        this.error.message = 'Invalid Message, message is too short.';
        return;
      }
      /*
        End of Form Validation
       */
      this.loading = true;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      try {
        await this.$http.$post('/api/contact', {
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message,
        });
        this.success.show = true;
        this.success.message = 'Successfully Submitted your form.';
      } catch (e) {
        this.error.show = true;
        this.error.message = e.response ? e.response.data.error || e.response.data : 'Something Happened Try Again Later.';
      }
      this.loading = false;
    },
    cancel() {
      this.name = '';
      this.email = '';
      this.message = '';
      this.subject = '';
      this.$router.push('/');
    },
  },
};
</script>
