<template>
  <div
    class="c-app flex-row align-items-center"
    :class="{ 'c-dark-theme': $store.state.darkMode }"
  >
    <CContainer>
      <CToaster :autohide="3000">
        <template v-for="info in infoList">
          <CToast
            :key="info.message"
            :show="true"
            :header="info.header"
            :color="info.color"
          >
            {{ info.message }}.
          </CToast>
        </template>
      </CToaster>

      <CRow class="justify-content-center">
        <CCol md="6">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm class="mb-2 text-center">
                  <CImg :src="logoUrl" width="200" class="mb-2"></CImg>
                  <h5>LLM ERM</h5> 
                  <p>(LLM E Refund Monitoring)</p> 
                  <CInput
                    placeholder="Username"
                    v-model="$v.obj.email.$model"
                    :isValid="checkIfValid('email')"
                    invalidFeedback="Please fill in email address"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    v-model="$v.obj.password.$model"
                    :isValid="checkIfValid('password')"
                    invalidFeedback="Please fill in password"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="12" class="text-center">
                      <CButton
                        color="primary"
                        class="px-4"
                        :disabled="!isValid"
                        @click.prevent="login"
                        >Login</CButton
                      >
                    </CCol>
                    <!-- <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0"
                        >Forgot password?</CButton
                      >
                      <CButton color="link" class="d-lg-none"
                        >Register now!</CButton
                      >
                    </CCol> -->
                  </CRow>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CRow>
                  <CCol class="text-center">
                    <p>{{ version }}</p>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCardGroup>
          <!-- <CRow>
            <CCol class="text-right">
              <CLink @click="gotToAdmin">Admin Login</CLink>
            </CCol>
          </CRow> -->
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import {
  required,
  minLength,
  email,
  sameAs,
  helpers,
  numeric,
  decimal,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "Login",
  data: () => {
    return {
      infoList: [],
      logoUrl: "img/logo.png",
      obj: {
         email: "",
         password: "",
        //email:null,
        //password:null,
        // authenticated: true,
      },
    };
  },

  mounted() {
    // var self = this;
    // self.obj = self.getEmptyObj();
    // console.log(self.obj)
  },

  validations: {
    obj: {
      password: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },

  computed: {
    version() {
      return process.env.VUE_APP_API_URL || window.config.VERSION;
    },
    isValid() {
      return !this.$v.obj.$invalid;
    },
    isDirty() {
      return this.$v.obj.$anyDirty;
    },
    isEditorRole() {
      var role = auth.getRole();
      if (role == "viewer") return false;
      return true;
    },
  },
  methods: {
    login() {
      var self = this;
      let data = {
        email: self.obj.email,
        password: self.obj.password,
      };
      auth
        .doLogin(data)
        .then((response) => {
          auth.recordLogin(response.data.token, response.data.user);
          self.$router.push({ path: "/dashboard" });
        })
        .catch(({ data }) => {
          console.log(data);
          self.toast(
            "Error",
            data.errorMsg,
            "danger"
          );
        });
    },
    checkIfValid(fieldName) {
      const field = this.$v.obj[fieldName];
      if (!field.$dirty) {
        return null;
      }
      return !(field.$invalid || field.$model === "");
    },
    validate() {
      this.$v.$touch();
    },
    reset() {
      // this.obj = this.getEmptyObj();
      this.resetObj();
      this.submitted = false;
      this.$v.$reset();
    },
    getEmptyObj() {
      return {
        email: null,
        password: null,
      };
    },
    toast(header, message, color) {
      var self = this;
      self.infoList.push({
        header: header,
        message: message,
        color: color,
      });
    },
  },
};
</script>
