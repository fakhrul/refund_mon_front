<template>
  <div class="email-sent-page d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="text-center shadow-lg p-3">
            <CCardBody class="p-4">
              <CImg :src="logoUrl" width="100" class="mb-3"></CImg>
              <h2 class="mb-4">Email Sent!</h2>
              <p class="text-muted mb-3">Your email has been successfully sent.</p>
              <p class="text-muted mb-4">Thank you for reaching out to us.</p>
              <CButton color="primary" class="w-100" @click="goBack">Go Back to Home</CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: "EmailSent",
  data: () => {
    return {
      logoUrl: "/img/logo.png",
    };
  },
  methods: {
    goBack() {
      this.$router.push('/pages/searchTransaction');
    },
  },
};
</script>

<style scoped>
.email-sent-page {
  background-color: #f8f9fa;
}

.email-sent-page .CCard {
  border-radius: 15px;
  border: none;
}

.email-sent-page .CCardBody {
  padding: 2rem;
}

.email-sent-page h2 {
  color: #343a40;
}

.email-sent-page .CButton {
  background-color: #007bff;
  border-color: #007bff;
  font-size: 1.2rem;
}

.email-sent-page .CButton:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.email-sent-page p {
  font-size: 1rem;
  color: #6c757d;
}
</style>
