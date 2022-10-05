<template>
  <div id="form-data">
    <button
      class="btn btn-info"
      data-bs-toggle="modal"
      data-bs-target="#modal-car-in"
    >
      Add Data
    </button>

    <div class="modal fade" id="modal-car-in" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="alert alert-primary" id="alert" role="alert">
            Create Data Success
          </div>
          <div class="alert alert-danger" id="error" role="alert">
            Create Data Error
          </div>
          <div class="modal-header">
            <h5 class="modal-title">เวลารถเข้า</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="card border-primary">
              <div class="card-body">
                <div class="row gy-5">
                  <div class="col-md-6">
                    <label for="">เลขทะเบียนรถ</label>
                    <input
                      v-model="data.licenseNumber"
                      class="form-control"
                      placeholder="กข-1234"
                      type="text"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="">เวลาเข้า</label>
                    <input
                      v-model="data.timeIn"
                      id="datepicker"
                      class="form-control"
                      type="datetime-local"
                      step="1"
                      date-time-format="DD-MM-YYYY HH:mm:ss"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-info"
              v-on:click="addData()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from "jquery-ui";
import axios from "axios";
export default {
  name: "FormData",
  data() {
    return {
      data: {
        licenseNumber: "",
        timeIn: "",
      },
      dafaultDate: "",
    };
  },
  mounted() {},
  methods: {
    formatDate(datetime) {
      let date_time = new Date(datetime);
      let day = date_time.getDate().toString().padStart(2, "0");
      let month = (date_time.getMonth() + 1).toString().padStart(2, "0");
      let year = date_time.getFullYear().toString().padStart(4, "0");
      let hour = date_time.getHours().toString().padStart(2, "0");
      let minute = date_time.getMinutes().toString().padStart(2, "0");
      let second = date_time.getSeconds().toString().padStart(2, "0");
      let timeIn =
        day +
        "-" +
        month +
        "-" +
        year +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;

      return timeIn;
    },
    addData() {
      this.data.timeIn = this.formatDate(this.data.timeIn);

      axios
        .put("http://localhost:8080/api/car", this.data)
        .then((response) => {
          let success = response.data.success;
          if (success) {
            let alert = document.getElementById("alert");
            console.log(alert);
            alert.style.display = "block";
          }
        })
        .catch((error) => {
          console.log(error)
          let errorAlert = document.getElementById("error");
          errorAlert.style.display = "block";
        });
    },
  },
};
</script>

<style scoped>
.alert {
  display: none;
}

</style>