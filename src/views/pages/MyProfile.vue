<template>
  <div class="wrapper">
    <div>
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
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardHeader> <strong> Profile </strong> Information </CCardHeader>
            <CCardBody>
              <CForm>
                <CInput
                  label="Name"
                  horizontal
                  v-model="$v.obj.name.$model"
                  :isValid="checkIfValid('name')"
                  invalidFeedback="This is a required field and must be at least 2 characters"
                />
                <CInput
                  label="Email"
                  horizontal
                  v-model="$v.obj.email.$model"
                  :isValid="checkIfValid('email')"
                  invalidFeedback="This is a required field and must be valid e-mail address"
                  :readonly="isEmailReadOnly"
                />
                <CInput label="Phone" horizontal v-model="obj.phoneno" />
                <CInput
                  label="Organization"
                  horizontal
                  autocomplete="organization"
                  v-model="$v.obj.organization.$model"
                  :isValid="checkIfValid('organization')"
                  invalidFeedback="This is a required field. Maximum is 200"
                />

                <CInput label="Role" horizontal v-model="obj.role" readonly />

                <CRow form class="form-group">
                  <CCol tag="label" sm="3" class="col-form-label">
                    Is Reset Password?
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      class="mr-1"
                      color="primary"
                      :checked.sync="isResetPassword"
                    />
                  </CCol>
                </CRow>
                <CInput
                  description="Please specifiy password. Minimum password is 8 character with combonation of capital letter, numbers and special chracter."
                  label="Password"
                  horizontal
                  autocomplete="password"
                  v-model="plainPassword"
                  v-if="isResetPassword"
                />
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton
                type="submit"
                size="sm"
                color="primary"
                :disabled="!isValid"
                @click="submit"
                ><CIcon name="cil-check-circle" /> Update</CButton
              >

              <!-- <CButton
                class="ml-1"
                color="success"
                :disabled="isValid"
                @click="validate"
              >
                Validate
              </CButton>
              <CButton
                class="ml-1"
                color="danger"
                :disabled="!isDirty"
                @click="reset"
              >
                Reset
              </CButton> -->
              <!-- <CButton class="ml-1" color="secondary" @click="cancel">
                Cancel
              </CButton> -->
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </div>
  </div>
</template>

<script>
import ProfileApi from "../../lib/profileApi";
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
  name: "MyProfile",
  data: () => {
    return {
      isResetPassword: false,
      plainPassword: "",
      isEmailReadOnly: true,
      infoList: [],
      api: new ProfileApi(),
      obj: {
        name: "",
        email: "",
        password: "",
        role: "",
        organization: "",
        phoneno: "",
        is_reset_password: false,
      },
      loading: false,
      submitted: false,
    };
  },
  mounted() {
    var self = this;
    self.resetObj();
  },
  validations: {
    obj: {
      name: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
      organization: {
        required,
        maxLength: maxLength(200),
      },
      phoneno: {
        // required,
        // numeric,
        maxLength: maxLength(11),
      },
    },
  },
  computed: {
    formString() {
      return JSON.stringify(this.obj, null, 4);
    },
    isValid() {
      return !this.$v.obj.$invalid;
    },
    isDirty() {
      return this.$v.obj.$anyDirty;
    },
  },
  methods: {
    onSubmit() {
      var self = this;
      // var profileDto = {
      //   profile: self.obj,
      //   isResetPassword: self.isResetPassword,
      //   plainPassword: self.plainPassword,
      // };

      self.obj.is_reset_password = self.isResetPassword;
      self.obj.password = self.plainPassword;

      if (!self.obj.id) {
      } else {
        this.api
          .updateProfile(self.obj)
          .then((response) => {
            self.toast("Success", "Database had been update", "success");
            // self.$router.push({ path: "/admins/AgentList" });
          })
          .catch(({ data }) => {
            console.log(data)
            self.toast("Error", data.errorMsg, "danger");
          });
      }
    },
    onReset(evt) {
      evt.preventDefault();
      this.obj = {};
    },
    toast(header, message, color) {
      var self = this;
      self.infoList.push({
        header: header,
        message: message,
        color: color,
      });
    },
    resetObj() {
      var self = this;
      var currentUserId = auth.getUserId();
      this.api
        .getCurrent(currentUserId)
        .then((response) => {
          self.obj = response.data;
          console.log(self.obj);
        })
        .catch(({ data }) => {
          self.toast("Error", helper.getErrorMessage(data), "danger");
        });
      self.isResetPassword = false;
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
        name: "",
        email: "",
        phoneno: "",
        organization: "",
        role: "viewer",
      };
    },
    submit() {
      if (this.isValid) {
        this.onSubmit();
        this.submitted = true;
      }
    },
    cancel() {
      //this.$router.push({ path: "/admins/AgentList" });
    },
  },
};
</script>
