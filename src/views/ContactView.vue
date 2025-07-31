<template>
	<div class="contact-view">
		<div class="contact-form-container">
			<h2>お問い合わせ</h2>
			<form v-if="!successMessage" @submit.prevent="submitForm">
				<div class="form-group">
					<label for="name">お名前</label>
					<input type="text" id="name" v-model="form.name" required />
				</div>

				<div class="form-group">
					<label for="email">メールアドレス</label>
					<input type="email" id="email" v-model="form.email" required />
				</div>

				<div class="form-group">
					<label for="title">件名</label>
					<input type="text" id="title" v-model="form.title" required />
				</div>

				<div class="form-group">
					<label for="body">本文</label>
					<textarea id="body" v-model="form.body" rows="6" required></textarea>
				</div>

				<p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

				<button type="submit" :disabled="isSubmitting">
					{{ isSubmitting ? '送信中...' : '送信する' }}
				</button>
			</form>
			
			<div v-if="successMessage" class="success-message">
				<p>{{ successMessage }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      gasWebAppUrl: 'https://script.google.com/macros/s/AKfycbzyedNeYYfWR-Bpo29WDDHuELA4-m6EqnPVcKuWDQEIlNVzjtsaTzNtw0ec9d8ImLCUkA/exec',
      form: {
        name: '',
        email: '',
        title: '',
        body: '',
      },
      isSubmitting: false,
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true;
      this.errorMessage = '';

      try {
        const response = await fetch(this.gasWebAppUrl, {
          method: 'POST',
          mode: 'no-cors', // CORSエラーを回避するため
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form),
        });

        // no-corsモードではレスポンスの詳細が取得できないため、
        // リクエストが成功したと見なして処理を進めます。
        this.successMessage = 'お問い合わせありがとうございます。メッセージが正常に送信されました。';
        
      } catch (error) {
        console.error('送信エラー:', error);
        this.errorMessage = 'メッセージの送信に失敗しました。時間をおいて再度お試しください。';
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  head() {
    return {
      title: this.$route.meta.title,
      meta: [
        { 
          name: 'description',
          content: this.$route.meta.description ,
        },
        {
          property: 'og:title',
          content: this.$route.meta.og_title,
        },
        {
          property: 'og:description',
          content: this.$route.meta.og_description,
        }
      ]
    };
  },
};
</script>

<style scoped>
.contact-form-container {
  max-width: 600px;
  margin: 6rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  padding: 0.75rem 1.5rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #888;
}
.success-message, .error-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
}
.success-message {
  background-color: #e0f2f1;
  color: #004d40;
}
.error-message {
  background-color: #ffebee;
  color: #c62828;
}
</style>
